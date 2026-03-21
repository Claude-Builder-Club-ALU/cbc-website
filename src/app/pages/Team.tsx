import { Linkedin, Github } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// TEAM DATA
// ─────────────────────────────────────────────────────────────────────────────
const team = [
  {
    name: "Chiagoziem Eke",
    role: "Claude Ambassador",
    photo: "/team/Chiagoziem.jpeg",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Favour Michael",
    role: "Claude Ambassador",
    photo: "/team/Favour.jpeg",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Marvin Ogore",
    role: "Staff Advisor",
    photo: "/team/Marvin.png",
    linkedin: "#",
    github: null,
  },
  {
    name: "Divine Ifechukwude",
    role: "Project Lead",
    photo: "/team/Divine.jpeg",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Kevin Mbonimpaye",
    role: "Technical",
    photo: "/team/Kevin.jpeg",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Bienvenu Cyuzuzo",
    role: "Technical",
    photo: "/team/Bienvenu-Cyuzuzo%20-%20BW.jpg",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Benjamin Kettey-Tagoe",
    role: "Technical",
    photo: "/team/Benjamin.jpeg",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Simileoluwa Oluwatunmise",
    role: "Operations",
    photo: "/team/Simi.jpeg",
    linkedin: "#",
    github: null,
  },
];

// ─────────────────────────────────────────────────────────────────────────────

interface MemberCardProps {
  name: string;
  role: string;
  photo: string;
  linkedin: string | null;
  github: string | null;
}

function MemberCard({ name, role, photo, linkedin, github }: MemberCardProps) {
  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-[#D97757] transition-all flex flex-col">
      {/* Photo — portrait ratio for headshots */}
      <div className="relative overflow-hidden aspect-[3/4]">
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold leading-snug group-hover:text-[#D97757] transition-colors">
          {name}
        </h3>
        <p className="text-[#D97757] text-sm font-medium mt-0.5 mb-4">{role}</p>

        {/* Socials */}
        <div className="flex items-center gap-2 mt-auto">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} on LinkedIn`}
              className="w-9 h-9 rounded-lg bg-background flex items-center justify-center text-muted-foreground hover:text-[#D97757] hover:bg-secondary transition-all border border-border"
            >
              <Linkedin size={17} />
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} on GitHub`}
              className="w-9 h-9 rounded-lg bg-background flex items-center justify-center text-muted-foreground hover:text-[#D97757] hover:bg-secondary transition-all border border-border"
            >
              <Github size={17} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SITE CONTRIBUTORS
// ─────────────────────────────────────────────────────────────────────────────
const contributors = [
  { name: "Bienvenu Cyuzuzo", github: "bienvenudev" },
  { name: "Kevin Mbonimpaye", github: "kevinmbonimpaye" },
];

// ─────────────────────────────────────────────────────────────────────────────

export function Team() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-[#D97757]/10 to-transparent py-20 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Meet the Team</h1>
          <p className="text-xl text-muted-foreground">
            The Claude Ambassadors and builders leading CBC at ALU.
          </p>
        </div>
      </section>

      {/* ── Team grid ── */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {team.map((m) => (
            <MemberCard key={m.name} {...m} />
          ))}
        </div>
      </section>

      {/* ── Site Contributors ── */}
      <section className="py-16 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-6">
            Site contributors
          </p>
          <div className="flex flex-wrap gap-3">
            {contributors.map((c) => (
              <a
                key={c.github}
                href={`https://github.com/${c.github}`}
                target="_blank"
                rel="noopener noreferrer"
                title={c.name}
                className="flex items-center gap-2.5 bg-card border border-border hover:border-[#D97757] rounded-xl px-3 py-2 transition-all group"
              >
                <img
                  src={`https://github.com/${c.github}.png?size=64`}
                  alt={c.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors font-mono">
                  {c.github}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Join CTA ── */}
      <section className="py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Want to get involved?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            We welcome all ALU students passionate about building with AI. Show
            up to an event and introduce yourself.
          </p>
          <a
            href="/events"
            className="inline-block bg-[#D97757] text-[#0D0D0D] px-8 py-4 rounded-xl font-semibold hover:bg-[#E08967] transition-all hover:shadow-lg hover:shadow-[#D97757]/30"
          >
            See Upcoming Events
          </a>
        </div>
      </section>
    </div>
  );
}
