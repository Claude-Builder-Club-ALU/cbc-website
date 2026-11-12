import { Github, Globe, Linkedin, type LucideIcon } from "lucide-react";
import { TEAM, type TeamMember } from "../data/team";

const LINKS: { key: keyof NonNullable<TeamMember["links"]>; label: string; Icon: LucideIcon }[] = [
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "github", label: "GitHub", Icon: Github },
  { key: "website", label: "Website", Icon: Globe },
];

/** Only real http(s) links are shown, so placeholders like "#" never render. */
function isRealUrl(url?: string) {
  return !!url && /^https?:\/\//i.test(url);
}

function MemberCard({ member }: { member: TeamMember }) {
  const links = LINKS.filter(({ key }) => isRealUrl(member.links?.[key]));
  return (
    <article className="group bg-card border border-border rounded-2xl overflow-hidden flex flex-col hover:border-primary/50 transition-colors">
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={member.photo}
          alt={`${member.name}, ${member.role}`}
          loading="lazy"
          className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition duration-500"
        />
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="text-base sm:text-lg font-bold leading-snug">{member.name}</h3>
        <p className="text-primary text-xs sm:text-sm font-semibold mt-1">{member.role}</p>
        {member.bio && (
          <p className="text-muted-foreground text-sm leading-relaxed mt-3">{member.bio}</p>
        )}

        {links.length > 0 && (
          <div className="flex items-center gap-2 mt-auto pt-4">
            {links.map(({ key, label, Icon }) => (
              <a
                key={key}
                href={member.links![key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on ${label} (opens in a new tab)`}
                title={label}
                className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary ring-1 ring-border transition-colors"
              >
                <Icon size={17} aria-hidden />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

/** "Meet the team" section for the home page. */
export function TeamSection() {
  return (
    <section id="team" className="py-20 sm:py-24 border-t border-border scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            Our team
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Meet the Executive Team</h2>
          <p className="text-muted-foreground text-lg text-balance max-w-2xl mx-auto">
            The students and staff who run CBC at ALU, plan every workshop and keep the club building.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {TEAM.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
