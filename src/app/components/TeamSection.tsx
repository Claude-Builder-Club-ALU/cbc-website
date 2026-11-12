import { Github, Globe, Linkedin, UserRound, type LucideIcon } from "lucide-react";
import {
  LEADERSHIP,
  LEADS,
  isOpenRole,
  type TeamEntry,
  type TeamLinks,
  type TeamMember,
} from "../data/team";

const LINKS: { key: keyof TeamLinks; label: string; Icon: LucideIcon }[] = [
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "github", label: "GitHub", Icon: Github },
  { key: "website", label: "Bio", Icon: Globe },
];

/** Only real http(s) links are shown, so placeholders like "#" never render. */
const isRealUrl = (url?: string) => !!url && /^https?:\/\//i.test(url);

function SocialLinks({ member, className = "justify-center" }: { member: TeamMember; className?: string }) {
  const base = "w-10 h-10 rounded-lg flex items-center justify-center ring-1 transition-colors";
  return (
    <div className={`flex items-center gap-2 mt-4 ${className}`}>
      {LINKS.map(({ key, label, Icon }) => {
        const url = member.links?.[key];
        if (isRealUrl(url)) {
          return (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name}: ${label} (opens in a new tab)`}
              title={label}
              className={`${base} text-muted-foreground ring-border hover:text-primary-foreground hover:bg-primary hover:ring-primary`}
            >
              <Icon size={17} aria-hidden />
            </a>
          );
        }
        // No link yet: show the icon greyed out so every card has the same row.
        return (
          <span
            key={key}
            role="img"
            aria-label={`${member.name}: ${label} coming soon`}
            title={`${label} coming soon`}
            className={`${base} text-muted-foreground/40 ring-border/60 cursor-not-allowed`}
          >
            <Icon size={17} aria-hidden />
          </span>
        );
      })}
    </div>
  );
}

function Photo({ member, className = "" }: { member: TeamMember; className?: string }) {
  return (
    <div className={`relative aspect-[4/5] overflow-hidden bg-secondary ${className}`}>
      <img
        src={member.photo}
        alt={`${member.name}, ${member.role}`}
        loading="lazy"
        className="w-full h-full object-cover object-top group-hover:grayscale group-hover:scale-[1.03] transition duration-500"
      />
    </div>
  );
}

/** Larger card for the President, Vice President, Technical Director and Staff Advisor. */
function LeaderCard({ member }: { member: TeamMember }) {
  return (
    // Phones: photo beside the details. From 640px: photo on top.
    <article className="group relative bg-card rounded-2xl overflow-hidden flex flex-row sm:flex-col ring-1 ring-border hover:ring-primary/60 transition-shadow">
      <span aria-hidden className="absolute inset-y-0 left-0 w-1 sm:inset-y-auto sm:top-0 sm:inset-x-0 sm:w-auto sm:h-1 bg-primary z-10" />
      <Photo member={member} className="w-32 shrink-0 sm:w-auto" />
      <div className="p-4 sm:p-6 text-left sm:text-center flex flex-col justify-center sm:justify-start flex-1 min-w-0">
        <span className="self-start sm:self-center text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary/10 ring-1 ring-primary/30 rounded-full px-3 py-1">
          {member.role}
        </span>
        <h3 className="text-lg sm:text-xl font-bold leading-snug mt-3">{member.name}</h3>
        {member.title && <p className="text-muted-foreground text-sm mt-1">{member.title}</p>}
        <SocialLinks member={member} className="justify-start sm:justify-center" />
      </div>
    </article>
  );
}

/** Compact card for leads. */
function LeadCard({ member }: { member: TeamMember }) {
  return (
    <article className="group bg-card rounded-2xl overflow-hidden flex flex-col ring-1 ring-border hover:ring-primary/60 transition-shadow">
      <Photo member={member} />
      <div className="p-4 text-center flex flex-col flex-1">
        <h3 className="text-base font-bold leading-snug">{member.name}</h3>
        <p className="text-primary text-xs font-semibold mt-1">{member.role}</p>
        <SocialLinks member={member} />
      </div>
    </article>
  );
}

/** Placeholder for a role that has not been filled yet (stretches to its row's height). */
function OpenRoleCard({ role }: { role: string }) {
  return (
    <article className="rounded-2xl flex flex-col items-center justify-center text-center gap-3 px-4 py-8 min-h-48 bg-card/40 outline-2 outline-dashed outline-border -outline-offset-2">
      <span className="w-14 h-14 rounded-full flex items-center justify-center bg-secondary text-muted-foreground">
        <UserRound size={26} aria-hidden />
      </span>
      <div>
        <h3 className="text-base font-bold leading-snug">{role}</h3>
        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mt-1.5">
          To be announced
        </p>
      </div>
    </article>
  );
}

function renderEntry(entry: TeamEntry, size: "leader" | "lead") {
  if (isOpenRole(entry)) return <OpenRoleCard key={entry.role} role={entry.role} />;
  return size === "leader" ? (
    <LeaderCard key={entry.name} member={entry} />
  ) : (
    <LeadCard key={entry.name} member={entry} />
  );
}

function TierHeading({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="h-px flex-1 bg-border" />
      <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {children}
      </h3>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

/** "Meet the Executive Team" section for the home page. */
export function TeamSection() {
  return (
    <section id="team" className="py-20 sm:py-24 border-t border-border scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            Our team
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Meet the Executive Team</h2>
        </div>

        <TierHeading>Leadership</TierHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-14">
          {LEADERSHIP.map((e) => renderEntry(e, "leader"))}
        </div>

        <TierHeading>Leads</TierHeading>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {LEADS.map((e) => renderEntry(e, "lead"))}
        </div>
      </div>
    </section>
  );
}
