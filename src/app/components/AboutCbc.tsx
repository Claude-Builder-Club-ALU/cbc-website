import { Link } from "react-router";
import {
  ArrowRight,
  Award,
  Hammer,
  MessageSquareHeart,
  Presentation,
  Rocket,
  Scale,
  Users,
  type LucideIcon,
} from "lucide-react";

type Card = { Icon: LucideIcon; title: string; body: string };

const PILLARS: Card[] = [
  {
    Icon: Award,
    title: "Backed by Anthropic",
    body:
      "We are part of Anthropic's official Claude Builder Club programme. Our ambassadors are supported by Anthropic, which brings the latest Claude tools, training and resources to ALU students.",
  },
  {
    Icon: MessageSquareHeart,
    title: "Your feedback shapes Claude",
    body:
      "What members tell us at workshops and events goes back to Anthropic. Your experience as an African student builder helps shape how Claude grows, including its tools for education.",
  },
  {
    Icon: Users,
    title: "Find your people",
    body:
      "Meet students who see AI as a way to expand what people can do, not to replace them. Build alongside future founders, engineers and changemakers from across Africa.",
  },
];

type Activity = Card & { label: string; link?: { to: string; text: string } };

const ACTIVITIES: Activity[] = [
  {
    label: "Regular",
    Icon: Presentation,
    title: "Workshops and guest speakers",
    body:
      "Hands-on sessions on Claude Code, MCP and building agents, plus talks from guest speakers. Some are technical and some are not, so every major can take part.",
    link: { to: "/events", text: "See upcoming workshops" },
  },
  {
    label: "Flagship",
    Icon: Rocket,
    title: "Hackathons and demo days",
    body:
      "Our end-of-semester hackathon is where members ship real projects with Claude and present them to the community. The strongest builds join our showcase.",
    link: { to: "/projects", text: "View member builds" },
  },
  {
    label: "Ongoing",
    Icon: Hammer,
    title: "Building for ALU",
    body:
      "Members build tools that solve real problems on campus, such as the SDL Automation Tool, which now handles grading, retakes and certificates for the SDL department.",
    link: { to: "/projects", text: "See CBC initiatives" },
  },
  {
    label: "Impact",
    Icon: Scale,
    title: "Responsible AI",
    body:
      "Through our AI Research Salon and open discussions, we explore AI safety, alignment and how to use AI responsibly at ALU and beyond.",
  },
];

function IconBox({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-primary/10">
      <Icon size={24} className="text-primary" aria-hidden />
    </div>
  );
}

/** "What is the Claude Builder Club?" and "What we do" sections for the home page. */
export function AboutCbc() {
  return (
    <>
      {/* ── What is CBC ── */}
      <section className="py-20 sm:py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              About the club
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              What is the Claude Builder Club?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed text-balance max-w-3xl mx-auto">
              Claude Builder Clubs are student-led communities on campuses around the world, run as
              part of Anthropic's official programme and supported by Claude for Education. CBC at
              ALU brings that programme to African Leadership University: a place where students
              from every major learn to build with Claude and to use AI responsibly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="bg-card border border-border rounded-2xl p-7 hover:border-primary/50 transition-colors"
              >
                <IconBox Icon={Icon} />
                <h3 className="text-xl font-bold mb-3 leading-snug">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we do ── */}
      <section className="py-20 sm:py-24 border-t border-border bg-card/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              What we do
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              How we build together
            </h2>
            <p className="text-muted-foreground text-lg text-balance max-w-2xl mx-auto">
              Every semester, CBC runs a programme of workshops, builds and conversations that
              anyone at ALU can join.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACTIVITIES.map(({ label, Icon, title, body, link }) => (
              <div
                key={title}
                className="bg-card border border-border rounded-2xl p-7 flex flex-col hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <IconBox Icon={Icon} />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/25 rounded-full px-2.5 py-1">
                    {label}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 leading-snug">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{body}</p>
                {link && (
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-1.5 min-h-10 mt-4 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    {link.text}
                    <ArrowRight size={16} aria-hidden />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
