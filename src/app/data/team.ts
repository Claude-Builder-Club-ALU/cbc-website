// CBC at ALU executive team, shown in the "Meet the Executive Team" section on the home page.
//
// Two tiers:
//   LEADERSHIP: President, Vice President, Technical Director and Staff Advisor (larger cards)
//   LEADS:      the club's leads (smaller cards)
//
// To fill an open role, replace its `{ role: "...", vacant: true }` entry with a
// full member entry. For each member:
//   - photo: put the image in public/team/ (portrait or square, at least 600px wide)
//   - links: full URLs (https://...). A link that is left out shows a greyed-out
//            "coming soon" icon until it is added.
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
    links: {
      linkedin: "https://www.linkedin.com/in/chiago/",
      github: "https://github.com/El-Gibbor",
    },
  },
  {
    name: "Favour Michael",
    role: "Vice President",
    title: "Claude Ambassador",
    photo: "/team/Favour.jpeg",
    links: {
      linkedin: "https://www.linkedin.com/in/froches/",
      github: "https://github.com/Froches",
      website: "https://portfolio.froches.tech/",
    },
  },
  {
    name: "Divine Ifechukwude",
    role: "Technical Director",
    photo: "/team/Divine.jpeg",
    links: {
      linkedin: "https://www.linkedin.com/in/ebitech14/",
      github: "https://github.com/Ebi-Tech",
      website: "https://divineifechukwude.vercel.app/",
    },
  },
  {
    name: "Marvin Ogore",
    role: "Staff Advisor",
    photo: "/team/02.-marvin.jpg",
  },
];

export const LEADS: TeamEntry[] = [
  { role: "Programs Lead", vacant: true },
  { role: "Marketing & Outreach Lead", vacant: true },
  { role: "Secretary & Operations Lead", vacant: true },
  { role: "Community Engagement Lead", vacant: true },
];
