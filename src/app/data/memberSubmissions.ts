// Member project submissions that the CBC team has approved.
//
// How it works:
//   1. Members submit through the Google Form (SUBMISSION_FORM_URL).
//   2. Answers land in the private review sheet. A CBC officer sets
//      "Approved" to Yes on the projects that should be shown.
//   3. The sheet's "Published" tab lists only approved rows (no emails) and is
//      published to the web as CSV (APPROVED_PROJECTS_CSV_URL).
//   4. The Projects page reads that CSV on every visit, so an approved project
//      appears within a few minutes with no code change or redeploy.

export const SUBMISSION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf2D7Z8o1EBmg4P2DXyZCQqIjev5kZbwFPxPg9n_VOigJDFEQ/viewform";

// Must be the published CSV of the "Published" tab only.
export const APPROVED_PROJECTS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1ScQYMHdf_7ZbiRK_bjWaKXp21BDVVRfDcHziwpA1ikXefdGA1iXKsKie37QMov1GpEPrrqbqzKbW/pub?gid=0&single=true&output=csv";

export type MemberProject = {
  id: string;
  name: string;
  builder: string;
  description: string;
  tags: string[];
  links: { demo?: string; code?: string; website?: string };
};

// The exact header row of the "Published" tab. If the CSV has any other
// header (for example the private responses tab, which contains emails),
// nothing is shown.
const EXPECTED_HEADERS = ["name", "builder", "description", "tags", "demo", "code", "website", "submitted"];

/** Minimal RFC 4180 CSV parser (quoted fields, escaped quotes, newlines in fields). */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

/** Only allow http(s) links, so a submission cannot inject javascript: URLs. */
function safeUrl(value: string | undefined): string | undefined {
  const v = value?.trim();
  if (!v) return undefined;
  try {
    const url = new URL(v);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function parseApprovedProjects(csv: string): MemberProject[] {
  const rows = parseCsv(csv.trim());
  if (rows.length === 0) return [];

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const headerMatches =
    header.length === EXPECTED_HEADERS.length && header.every((h, i) => h === EXPECTED_HEADERS[i]);
  if (!headerMatches) {
    console.warn("Approved projects CSV has unexpected columns; not showing submissions.");
    return [];
  }

  return rows
    .slice(1)
    .map(([name, builder, description, tags, demo, code, website, submitted]) => ({
      id: `submission-${submitted ?? ""}-${name ?? ""}`,
      name: (name ?? "").trim(),
      builder: (builder ?? "").trim(),
      description: (description ?? "").trim(),
      tags: (tags ?? "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      links: { demo: safeUrl(demo), code: safeUrl(code), website: safeUrl(website) },
    }))
    .filter((p) => p.name && p.builder && p.description);
}

export async function fetchApprovedProjects(signal?: AbortSignal): Promise<MemberProject[]> {
  if (!APPROVED_PROJECTS_CSV_URL) return [];
  const res = await fetch(APPROVED_PROJECTS_CSV_URL, { signal, cache: "no-store" });
  if (!res.ok) throw new Error(`Approved projects CSV returned ${res.status}`);
  return parseApprovedProjects(await res.text());
}
