import { ExternalLink, Lock, Zap, BookOpen, Users, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  SUBMISSION_FORM_URL,
  fetchApprovedProjects,
  type MemberProject,
} from "../data/memberSubmissions";

// ─────────────────────────────────────────────────────────────────────────────
// CBC TEAM INITIATIVES
// ─────────────────────────────────────────────────────────────────────────────
const initiatives = [
  {
    id: 1,
    title: "SDL Automation Tool",
    builder: "Divine Ifechukwude, CBC Technical Lead",
    status: "live" as const,
    partner: "ALU Self-Directed Learning",
    impact: "Now an internal tool used by the SDL department across cohorts",
    description:
      "Automates SDL grading, sorts students who need a retake, and sends certificates to whole cohorts by bulk email, replacing hours of manual work for the SDL team.",
    tags: ["Claude", "Automation", "Bulk Email", "ALU Internal"],
    icon: <Zap size={22} />,
    link: "#",
  },
  {
    id: 2,
    title: "Intro to Linux Workshop Series",
    builder: "CBC Team",
    status: "in-progress" as const,
    partner: "Student Success Team",
    impact: "Equipping ALU students with foundational Linux & CLI skills",
    description:
      "A hands-on workshop curriculum co-developed with the Student Success Team. Covers shell basics, file systems, scripting, and developer tooling — built to run as a recurring ALU programme.",
    tags: ["Education", "Linux", "ALU Programme"],
    icon: <BookOpen size={22} />,
    link: "#",
  },
  {
    id: 3,
    title: "AI Literacy Curriculum",
    builder: "CBC Team",
    status: "planned" as const,
    partner: "Academic Affairs",
    impact: "Bringing AI fundamentals to every ALU student",
    description:
      "A structured curriculum covering LLM concepts, prompt engineering, and responsible AI use — currently in scoping discussions with Academic Affairs to integrate into the broader ALU learning journey.",
    tags: ["Curriculum", "AI Education", "Institutional"],
    icon: <Users size={22} />,
    link: "#",
  },
];

const STATUS_CONFIG = {
  live: { label: "Live", className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  "in-progress": { label: "In Progress", className: "bg-primary/20 text-primary border-primary/30" },
  planned: { label: "Planned", className: "bg-muted text-muted-foreground border-border" },
};

// ─────────────────────────────────────────────────────────────────────────────
// MEMBER BUILDS
// ─────────────────────────────────────────────────────────────────────────────
// ALU projects from the Claude Hackathon showcase (hackathon-builder-hub.vercel.app).
// Only links that currently resolve are listed.
const memberProjects: MemberProject[] = [
  {
    id: "member-1",
    name: "Student Companion AI",
    builder: "Andrew Boima & Dieudonnne Ngum",
    description:
      "Supports ALU students on academic work, campus navigation, and personal development. It addresses the gap between what a university formally provides and what students actually need day to day.",
    tags: ["Productivity", "Automation", "Education", "Tool"],
    links: {
      demo: "https://vimeo.com/1197394938",
      code: "https://github.com/Ngum12/alu_student_companion",
      website: "https://alustudentcompanion.vercel.app/",
    },
  },
  {
    id: "member-2",
    name: "Qobi",
    builder: "Teninlanimi Taiwo & Raymond Otieno",
    description:
      "An AI co-pilot for ALU students that reads your Gmail and Canvas, surfaces what is easy to miss, and shows how a single missed obligation ripples across your academics, finances, standing, and visa status, all in one calm daily brief.",
    tags: ["Productivity", "Automation", "Education", "Tool"],
    links: {
      demo: "https://youtu.be/gZ7_nBJtOac",
      website: "https://www.qobi-copilot.xyz/",
    },
  },
  {
    id: "member-3",
    name: "Daylens",
    builder: "Iradukunda Christian Tonny",
    description:
      "Daylens logs your browsing and work sessions, uses Claude to summarise what you consumed, and lets you search your own digital history through a natural language chat interface, all stored privately on your device.",
    tags: ["Productivity", "Automation", "Tool"],
    links: {
      demo: "https://youtu.be/luqeVg7IRps",
      website: "https://christian-tonny.dev/daylens",
    },
  },
  {
    id: "member-4",
    name: "Outreach AI",
    builder: "Michael Nwuju",
    description:
      "Automates outbound sales calls for African entrepreneurs: it generates personalised pitches per lead, places AI voice calls, and analyses each transcript, giving businesses in Africa access to sales infrastructure that has historically been out of reach.",
    tags: ["Tool", "Productivity", "Automation", "Data Analysis"],
    links: {
      demo: "https://youtu.be/fNtiUsfST9E",
      code: "https://github.com/michael-alu/outreach-ai",
    },
  },
];

const PROJECT_LINK_LABELS: { key: keyof MemberProject["links"]; label: string }[] = [
  { key: "demo", label: "Demo" },
  { key: "code", label: "Code" },
  { key: "website", label: "Website" },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
type Tab = "initiatives" | "member-builds";

export function Projects() {
  const [tab, setTab] = useState<Tab>("initiatives");
  const [approvedProjects, setApprovedProjects] = useState<MemberProject[]>([]);

  // Load member submissions the CBC team has approved in the review sheet.
  useEffect(() => {
    const controller = new AbortController();
    fetchApprovedProjects(controller.signal)
      .then(setApprovedProjects)
      .catch((err) => {
        if (err?.name !== "AbortError") console.warn("Could not load approved projects", err);
      });
    return () => controller.abort();
  }, []);

  const knownNames = new Set(memberProjects.map((p) => p.name.toLowerCase()));
  const allMemberProjects = [
    ...memberProjects,
    ...approvedProjects.filter((p) => !knownNames.has(p.name.toLowerCase())),
  ];

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-primary/10 to-transparent py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            What we build matters. Explore CBC's institutional initiatives and
            the community projects our members are shipping with AI.
          </p>
        </div>
      </section>

      {/* ── Tabs ── */}
      <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0">
            <button
              onClick={() => setTab("initiatives")}
              className={`relative px-6 py-4 text-sm font-semibold transition-colors ${tab === "initiatives"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              CBC Initiatives
              {tab === "initiatives" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
              <span className="ml-2 text-[10px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wide">
                Team
              </span>
            </button>

            <button
              onClick={() => setTab("member-builds")}
              className={`relative px-6 py-4 text-sm font-semibold transition-colors ${tab === "member-builds"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Member Builds
              {tab === "member-builds" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── TAB: CBC Initiatives ── */}
      {tab === "initiatives" && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">CBC × ALU</h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              These are projects the CBC core team is building <em>for</em> ALU —
              tools and programmes that directly serve students, faculty, and the
              institution. Not experiments. Real impact.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {initiatives.map((project) => {
              const status = STATUS_CONFIG[project.status];
              return (
                <div
                  key={project.id}
                  className="bg-card border border-border rounded-2xl p-7 hover:border-primary transition-all group flex flex-col"
                >
                  {/* Icon + status */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                      {project.icon}
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${status.className}`}>
                      {status.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Partner */}
                  <p className="text-xs text-muted-foreground mb-3 font-medium">
                    × {project.partner}
                  </p>

                  {/* Impact callout */}
                  <div className="bg-primary/10 border border-primary/20 rounded-xl px-3 py-2.5 mb-4">
                    <p className="text-xs text-primary font-medium leading-snug">
                      {project.impact}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-secondary text-muted-foreground px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Builder */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">by {project.builder}</span>
                    {project.link !== "#" && (
                      <a
                        href={project.link}
                        className="flex items-center gap-1.5 text-primary hover:underline font-medium"
                      >
                        View <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA to switch tab */}
          <div className="mt-16 border border-border rounded-2xl p-8 text-center bg-card/50">
            <p className="text-muted-foreground mb-4">
              Are you a CBC member who built something with Claude?
            </p>
            <button
              onClick={() => setTab("member-builds")}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              See Member Builds & submit your project
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      )}

      {/* ── TAB: Member Builds ── */}
      {tab === "member-builds" && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid */}
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Built by the Community</h2>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Working products built by club members with Claude, from AI study
              companions to automated outreach tools. Each one shows what our members
              can design, code and ship. Built something with Claude? Submit it below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
            {allMemberProjects.map((project) => (
              <div
                key={project.id}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary transition-all group flex flex-col"
              >
                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">by {project.builder}</p>
                <p className="text-foreground mb-6 leading-relaxed text-sm flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {PROJECT_LINK_LABELS.filter(({ key }) => project.links[key]).map(({ key, label }) => (
                    <a
                      key={key}
                      href={project.links[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label}: ${project.name} (opens in a new tab)`}
                      className="inline-flex items-center gap-1.5 border border-border hover:border-primary hover:text-primary text-sm font-medium px-4 py-2 rounded-full transition-colors"
                    >
                      {label}
                      <ExternalLink size={14} />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Submission form */}
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Submit Your Project</h2>
              <div className="h-1 w-24 bg-primary mx-auto mb-4" />
              <p className="text-muted-foreground">
                Built something with Claude? Share it with the club. It takes about two minutes.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              {/* ALU-only notice */}
              <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-6 flex items-start gap-3">
                <Lock className="text-primary mt-0.5 flex-shrink-0" size={18} />
                <div className="text-sm">
                  <p className="text-foreground font-semibold mb-1">ALU Students Only</p>
                  <p className="text-muted-foreground">
                    Submissions require an @alustudent.com email to keep the
                    showcase community-authentic.
                  </p>
                </div>
              </div>

              <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                <li>Tell us what you built, who built it and how it uses Claude.</li>
                <li>Add a demo video, code or live link if you have one.</li>
                <li>The CBC team reviews each submission. Approved projects appear on this page.</li>
              </ul>

              <a
                href={SUBMISSION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                Submit Your Project
                <ExternalLink size={16} aria-hidden />
                <span className="sr-only">(opens Google Forms in a new tab)</span>
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
