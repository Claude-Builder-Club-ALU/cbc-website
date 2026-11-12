import { ArrowUpRight, Code2, Coins, Sparkles, Trophy, type LucideIcon } from "lucide-react";

const JOIN_URL = "https://www.jotform.com/253555944387168";

const HIGHLIGHTS: { Icon: LucideIcon; title: string; text: string }[] = [
  { Icon: Coins, title: "$50 API credits", text: "For every participant, to build your project" },
  { Icon: Code2, title: "Build with Claude", text: "Ship a working project, solo or with a team" },
  { Icon: Trophy, title: "Demo day and prizes", text: "Present to the community and compete to win" },
];

/** Featured card for the end-of-program hackathon (home page and Events page). */
export function HackathonSpotlight({ className = "" }: { className?: string }) {
  return (
    <article
      id="event-card-hackathon"
      aria-labelledby="hackathon-spotlight-title"
      className={`relative overflow-hidden rounded-3xl bg-card ring-2 ring-primary/50 shadow-[0_20px_60px_-30px] shadow-primary/50 scroll-mt-28 ${className}`}
    >
      {/* Decoration */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(currentColor_1px,transparent_1px),linear-gradient(90deg,currentColor_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
      />

      <div className="relative grid gap-8 p-6 sm:p-8 lg:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider px-3 py-1">
              <Sparkles size={13} aria-hidden />
              Flagship event
            </span>
            <span className="rounded-full bg-primary/10 ring-1 ring-primary/30 text-primary text-xs font-semibold uppercase tracking-wider px-3 py-1">
              Fall 2026 / Spring 2027
            </span>
          </div>

          <h3 id="hackathon-spotlight-title" className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
            End-of-Program Hackathon
          </h3>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
            The biggest CBC event of the year. Two semesters of workshops lead here: take an idea, build it
            with Claude and show ALU what you made.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {HIGHLIGHTS.map(({ Icon, title, text }) => (
              <li key={title} className="flex sm:flex-col gap-3 rounded-2xl bg-background/60 ring-1 ring-border p-4">
                <span className="w-10 h-10 shrink-0 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                  <Icon size={20} aria-hidden />
                </span>
                <span>
                  <span className="block font-semibold text-foreground leading-snug">{title}</span>
                  <span className="block text-sm text-muted-foreground leading-snug mt-0.5">{text}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3">
            <a
              href={JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-semibold px-6 py-3 hover:bg-primary/90 transition-colors shadow-md"
            >
              Join CBC to take part
              <ArrowUpRight size={18} aria-hidden />
            </a>
            <p className="text-sm text-muted-foreground">Open to all CBC members. Exact dates announced soon.</p>
          </div>
        </div>

        {/* Date block */}
        <div className="order-first lg:order-none flex lg:flex-col items-center gap-4 lg:gap-3 rounded-2xl bg-primary text-primary-foreground p-5 lg:p-8 lg:w-56 lg:text-center">
          <Trophy className="w-10 h-10 lg:w-14 lg:h-14 shrink-0" strokeWidth={1.75} aria-hidden />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">Happening</p>
            <p className="text-xl lg:text-2xl font-bold leading-tight mt-1">End of Spring 2027</p>
          </div>
        </div>
      </div>
    </article>
  );
}
