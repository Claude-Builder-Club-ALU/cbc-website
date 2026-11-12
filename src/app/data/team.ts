// CBC at ALU executive team, shown in the "Meet the Executive Team" section on the home page.
//
// Two tiers:
//   LEADERSHIP: President, Vice President and Staff Advisor (larger cards)
//   LEADS:      the club's leads (smaller cards)
//
// To fill an open role, replace its `{ role: "...", vacant: true }` entry with a
// full member entry. For each member:
//   - photo: put the image in public/team/ (portrait or square, at least 600px wide)
//   - links: full URLs (https://...). A link that is left out has no icon.
//            website can be a personal site, portfolio or link-in-bio page.

export type TeamLinks = { linkedin?: string; github?: string; website?: string };

export type TeamMember = {
  name: string;
  role: string;
  title?: string; // optional second line, e.g. "Claude Ambassador"
  photo: string;
  links?: TeamLinks;
};

export type OpenRole = { role: string; vacant: true };

export type TeamEntry = TeamMember | OpenRole;

export const isOpenRole = (e: TeamEntry): e is OpenRole => "vacant" in e;

export const LEADERSHIP: TeamEntry[] = [
  {
    name: "Chiagoziem Eke",
    role: "President",
    title: "Claude Ambassador",
    photo: "/team/Chiagoziem.jpeg",
  },
  {
    name: "Favour Michael",
    role: "Vice President",
    title: "Claude Ambassador",
    photo: "/team/Favour.jpeg",
  },
  {
    name: "Marvin Ogore",
    role: "Staff Advisor",
    photo: "/team/02.-marvin.jpg",
  },
];

export const LEADS: TeamEntry[] = [
  {
    name: "Divine Ifechukwude",
    role: "Technical Lead",
    photo: "/team/Divine.jpeg",
  },
  { role: "Programs Lead", vacant: true },
  { role: "Marketing & Outreach Lead", vacant: true },
  { role: "Secretary & Operations Lead", vacant: true },
  { role: "Community Engagement Lead", vacant: true },
];
