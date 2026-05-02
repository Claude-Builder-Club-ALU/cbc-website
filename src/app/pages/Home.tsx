import { Link } from "react-router";
import { ArrowRight, Calendar, MapPin, User, Star, BookOpen, Heart, Gift, Code2, Trophy, Shield, Zap, Globe } from "lucide-react";
import { PhotoCarousel } from "../components/PhotoCarousel";
import { TestimonialCarousel } from "../components/TestimonialCarousel";
import { LogoPool } from "../components/LogoPool";

type EventRowIcon = "calendar" | "map" | "user";

interface HomeUpcomingEvent {
  id: number;
  dateLabel: string;
  title: string;
  rows: { icon: EventRowIcon; text: string }[];
  chip?: string;
  featured: boolean;
  seasonFinale?: boolean;
  action: "checkBack" | "calendar";
  ics?: {
    date: string;
    start: string;
    end: string;
    location: string;
  };
}

export function Home() {
  const upcomingEvents: HomeUpcomingEvent[] = [
    {
      id: 1,
      dateLabel: "Date to be announced",
      title: "AI Fluency and Ethical Use of AI Workshop",
      rows: [
        { icon: "calendar", text: "Scheduled by Student Success" },
        { icon: "user", text: "ALU Kigali Campus" },
      ],
      chip: "Official date TBD",
      featured: false,
      action: "checkBack",
    },
    {
      id: 2,
      dateLabel: "May 15, 2026",
      title: "Workshop: Building with AI Agents",
      rows: [
        { icon: "calendar", text: "02:30 - 04:00" },
        { icon: "map", text: "Algeria Classroom, Social commons" },
      ],
      featured: false,
      action: "calendar",
      ics: {
        date: "2026-05-15",
        start: "10:00",
        end: "11:00",
        location: "Algeria Classroom, ALU",
      },
    },
    {
      id: 3,
      dateLabel: "May 29, 2026",
      title: "Hackathon: AI for Africa",
      rows: [
        { icon: "calendar", text: "09:00 - 21:00" },
        { icon: "map", text: "Kenya-Burundi Hall, Enterprise commons" },
      ],
      featured: true,
      seasonFinale: true,
      action: "calendar",
      ics: {
        date: "2026-04-02",
        start: "09:00",
        end: "21:00",
        location: "Kenya-Burundi Hall, ALU",
      },
    },
  ];

  const addToCalendar = (event: HomeUpcomingEvent) => {
    if (!event.ics) return;
    const eventDate = new Date(`${event.ics.date}T${event.ics.start}`);
    const endDate = new Date(`${event.ics.date}T${event.ics.end}`);

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${eventDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
SUMMARY:${event.title}
LOCATION:${event.ics.location}
DESCRIPTION:Claude Builder Club Event at ALU
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${event.title.replace(/[^a-z0-9]/gi, "_")}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const rowIcon = (icon: EventRowIcon) => {
    switch (icon) {
      case "calendar":
        return Calendar;
      case "map":
        return MapPin;
      default:
        return User;
    }
  };

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D97757]/5 via-transparent to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">

          {/* ── Desktop center: Logo ── */}
          <div id="hero-logo" className="hidden md:flex flex-1 justify-center mb-10">
            {/* <Logo /> */}
            <Link to="/" className="flex items-center max-md:items-start gap-5 group">
              <img src="/logos/alu_colored.png" alt="ALU" className="h-8 max-md:h-5 dark:hidden" />
              <img src="/logos/alu_white.png" alt="ALU" className="h-8 max-md:h-5 hidden dark:flex" />
              <img src="/logos/claude_colored.png" alt="Claude" className="h-9 max-md:h-5 dark:hidden" />
              <img src="/logos/claude_white.png" alt="Claude" className="h-9 max-md:h-5 hidden dark:flex" />
            </Link>
          </div>

          {/* "All majors welcome" badge */}
          <div className="inline-flex items-center gap-2 bg-[#D97757]/10 border border-[#D97757]/30 text-[#D97757] text-sm font-medium px-4 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 min-w-2 rounded-full bg-[#D97757] animate-pulse"></span>
            Open to all majors · No coding experience required
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {/* Build the future.
            <br />
            <span className="text-[#D97757]">With AI.</span> */}
            Everyone can build with AI
            <br />
            Starting with <span className="text-[#D97757]">You</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Africa does not lack problems. It needs builders. Claude Builder Club at ALU is where students come to build the answers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.jotform.com/253555944387168"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#D97757] text-[#ffffff] px-8 h-12 rounded-full font-bold hover:bg-[#E08967] transition-all hover:shadow-lg hover:shadow-[#D97757]/30 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Join Us
              <ArrowRight size={20} />
            </a>
            <Link
              to="/projects"
              className="border-2 border-[#D97757] text-[#D97757] px-8 h-12 rounded-full font-semibold hover:bg-[#D97757] hover:text-[#0D0D0D] transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              See Our Work
            </Link>
          </div>
        </div>

        <div className="absolute top-20 left-10 w-72 h-72 bg-[#D97757]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D97757]/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* ── Logo pool ── */}
        <div className="absolute bottom-0 left-0 right-0">
          <LogoPool className="h-44" />
        </div>
      </section>

      {/* ── Photo Carousel ────────────────────────────────────────────────────── */}
      <section className="py-16 border-t border-border">
        <PhotoCarousel />
      </section>

      {/* ── Member Perks ─────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border bg-card/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">What You Get as a CBC Memeber</h2>
            <p className="text-muted-foreground text-lg">Resources built for students ready to build, learn, and contribute throughout the semester.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Perk 1 — Claude Pro */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-[#D97757]/50 transition-all group text-center">
              <div className="w-14 h-14 bg-[#D97757]/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-[#D97757]/20 transition-colors">
                <Gift size={28} className="text-[#D97757]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Free Claude Pro</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
              Five times more usage than the free tier, with access to Claude's most capable models including Sonnet and Opus - available to active CBC members to power their projects all semester long.
              </p>
            </div>

            {/* Perk 2 — API Credits */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-[#D97757]/50 transition-all group text-center">
              <div className="w-14 h-14 bg-[#D97757]/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-[#D97757]/20 transition-colors">
                <Code2 size={28} className="text-[#D97757]" />
              </div>
              <h3 className="text-xl font-bold mb-3">$25 API Credits</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
              Build real applications with the Anthropic API. Claude Code access is included, enabling you to write, debug, and ship code directly from your terminal.
              </p>
            </div>

            {/* Perk 3 — Hackathon */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-[#D97757]/50 transition-all group text-center">
              <div className="w-14 h-14 bg-[#D97757]/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-[#D97757]/20 transition-colors">
                <Trophy size={28} className="text-[#D97757]" />
              </div>
              <h3 className="text-xl font-bold mb-3">End-of-Semester Hackathon</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
              Compete for prizes, build real projects, and demonstrate what you have created over the course of the semester. Open to all CBC members regardless of technical background or experience level.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <a
              href="https://www.jotform.com/253555944387168"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#D97757] text-[#0D0D0D] px-8 py-3.5 rounded-xl font-semibold hover:bg-[#E08967] transition-all hover:shadow-lg hover:shadow-[#D97757]/30"
            >
              Start Building with CBC
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ───────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#0D0D0D] text-[#F5F5F5] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-12 lg:mb-14">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">Upcoming Events</h2>
              <p className="text-zinc-400 text-base sm:text-lg max-w-xl">
                Stay engaged with what is coming up this semester
              </p>
            </div>
            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 text-[#D97757] font-medium hover:text-[#E08967] transition-colors shrink-0"
            >
              View All
              <ArrowRight size={18} className="text-[#D97757]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className={`relative rounded-2xl p-6 sm:p-7 flex flex-col h-full bg-[#1A1A1A] border transition-colors ${
                    event.featured
                      ? "border-2 border-[#D97757] shadow-[0_0_0_1px_rgba(217,119,87,0.15)]"
                      : "border border-white/10 hover:border-white/20"
                  } ${event.seasonFinale ? "pt-9 sm:pt-10" : ""}`}
                >
                  {event.seasonFinale && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <span className="inline-flex items-center gap-1.5 bg-[#D97757] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                        <Star size={12} className="text-amber-200 fill-amber-200 shrink-0" aria-hidden />
                        Season Finale
                      </span>
                    </div>
                  )}

                  <p className="text-[#D97757] font-semibold text-sm sm:text-base mb-3 mt-1">{event.dateLabel}</p>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-snug mb-4">{event.title}</h3>
                  <div className="border-t border-white/10 mb-4" />
                  <div className="space-y-3 text-zinc-400 text-sm flex-1 mb-5">
                    {event.rows.map((row, i) => {
                      const Icon = rowIcon(row.icon);
                      return (
                        <div key={i} className="flex items-start gap-2.5">
                          <Icon size={16} className="shrink-0 mt-0.5 text-zinc-500" aria-hidden />
                          <span className="leading-snug">{row.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {event.chip && (
                    <div className="mb-5">
                      <span className="inline-block text-xs font-medium text-zinc-400 bg-zinc-800/80 border border-white/10 rounded-full px-3 py-1">
                        {event.chip}
                      </span>
                    </div>
                  )}

                  {event.action === "checkBack" ? (
                    <button
                      type="button"
                      className="w-full mt-auto py-3 rounded-xl font-semibold text-white border border-white/80 bg-transparent hover:bg-white/10 transition-colors"
                    >
                      Check Back Soon
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => addToCalendar(event)}
                      className="w-full mt-auto py-3 rounded-xl font-semibold text-white border border-white/80 bg-transparent hover:bg-white/10 transition-colors"
                    >
                      Add to Calendar
                    </button>
                  )}
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who We Are ───────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-[#0D0D0D] text-[#F5F5F5] border-y border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">Who We Are</h2>
          <div className="h-1 w-24 bg-[#D97757] mx-auto mb-8 sm:mb-10 rounded-full" />

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-5 max-w-4xl mx-auto">
            We are an inclusive community for students who want to explore AI development, grow their technical abilities, and engage seriously with the opportunities and responsibilities that AI presents.
          </p>

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {[
              {
                Icon: User,
                box: "bg-emerald-950/70 border border-emerald-800/60",
                icon: "text-emerald-400",
                title: "All are welcome",
                desc: "No Software Engineering background required. Any major, any skill level. If you are curious, you belong here.",
              },
              {
                Icon: BookOpen,
                box: "bg-blue-950/70 border border-blue-800/60",
                icon: "text-blue-400",
                title: "Continuous learners",
                desc: "Whether you have never written a line of code or have shipped production applications, there is always something new to build and discover.",
              },
              {
                Icon: Star,
                box: "bg-amber-950/60 border border-amber-800/50",
                icon: "text-amber-400",
                title: "Foster creativity",
                desc: "Build solutions for problems that genuinely matter to you, from health and education to governance and economic opportunity across Africa.",
              },
              {
                Icon: Heart,
                box: "bg-orange-950/50 border border-orange-900/60",
                icon: "text-orange-400",
                title: "Fun and engaging",
                desc: "Connect with peers, learn from guest speakers, and be part of a community that is genuinely enthusiastic about building with AI.",
              },
            ].map((v) => {
              const ValueIcon = v.Icon;
              return (
              <div
                key={v.title}
                className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col items-center text-center hover:border-white/20 transition-colors"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${v.box}`}>
                  <ValueIcon size={26} strokeWidth={1.75} className={v.icon} aria-hidden />
                </div>
                <h4 className="font-bold text-white text-lg mb-3 leading-snug">{v.title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Claude? ──────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Why Claude?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Not all AI tools are built the same. Here's why we build with Claude.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-2xl p-8 hover:border-[#D97757]/50 transition-all">
            <div className="w-12 h-12 bg-[#D97757]/10 rounded-xl flex items-center justify-center mb-5">
              <Shield size={24} className="text-[#D97757]" />
            </div>
            <h3 className="text-xl font-bold mb-3">Safety-First</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Built by Anthropic with Constitutional AI — designed to be helpful, harmless, and honest. Claude is engineered to be transparent about what it doesn't know.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 hover:border-[#D97757]/50 transition-all">
            <div className="w-12 h-12 bg-[#D97757]/10 rounded-xl flex items-center justify-center mb-5">
              <Zap size={24} className="text-[#D97757]" />
            </div>
            <h3 className="text-xl font-bold mb-3">Built for Builders</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Claude Code lets you delegate complex coding tasks from your terminal. From architecture to deployment — Claude accelerates every step of the software development lifecycle.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 hover:border-[#D97757]/50 transition-all">
            <div className="w-12 h-12 bg-[#D97757]/10 rounded-xl flex items-center justify-center mb-5">
              <Globe size={24} className="text-[#D97757]" />
            </div>
            <h3 className="text-xl font-bold mb-3">Built for Africa</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We challenge members to build solutions for health, education, climate, and economic opportunity. The problems that matter most in Africa deserve the best AI tools.
            </p>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Members Say</h2>
          <TestimonialCarousel />
        </div>
      </section>
    </div>
  );
}
