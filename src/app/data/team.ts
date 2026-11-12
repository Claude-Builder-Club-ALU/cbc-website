// CBC at ALU executive team, shown in the "Meet the team" section on the home page.
//
// To update a profile, edit the entry below:
//   - photo: put the image in public/team/ (portrait or square, at least 600px wide)
//   - bio:   one or two short sentences (optional)
//   - links: full URLs (https://...). Leave a link out and its icon is hidden.
//            website can be a personal site, portfolio or link-in-bio page.

export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  bio?: string;
  links?: { linkedin?: string; github?: string; website?: string };
};

export const TEAM: TeamMember[] = [
  { name: "Chiagoziem Eke", role: "Claude Ambassador", photo: "/team/Chiagoziem.jpeg" },
  { name: "Favour Michael", role: "Claude Ambassador", photo: "/team/Favour.jpeg" },
  { name: "Divine Ifechukwude", role: "CBC Technical Lead", photo: "/team/Divine.jpeg" },
  { name: "Kevin Mbonimpaye", role: "Technical", photo: "/team/Kevin.jpeg" },
  { name: "Bienvenu Cyuzuzo", role: "Technical", photo: "/team/Bienvenu-Cyuzuzo%20-%20BW.jpg" },
  { name: "Benjamin Kettey-Tagoe", role: "Technical", photo: "/team/Benjamin.jpeg" },
  { name: "Simileoluwa Oluwatunmise", role: "Operations", photo: "/team/Simi.jpeg" },
  { name: "Marvin Ogore", role: "Staff Advisor", photo: "/team/02.-marvin.jpg" },
];
