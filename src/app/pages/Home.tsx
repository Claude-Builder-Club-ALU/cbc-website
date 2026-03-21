import { Link } from "react-router";
import { ArrowRight, Calendar, MapPin, Users, Gift, Code2, Trophy, Shield, Zap, Globe } from "lucide-react";
import { PhotoCarousel } from "../components/PhotoCarousel";
import { TestimonialCarousel } from "../components/TestimonialCarousel";
import { Logo } from "../components/Navbar";
import { LogoPool } from "../components/LogoPool";

export function Home() {
  const upcomingEvents = [
    {
      id: 1,
      date: "2026-03-25",
      title: "AI Workshop: Building with Claude API",
      time: "18:00 - 20:00",
      location: "Innovation Hub, ALU Kigali",
      attendees: 45,
      featured: false,
    },
    {
      id: 2,
      date: "2026-04-02",
      title: "Hackathon: AI for Africa",
      time: "09:00 - 21:00",
      location: "Main Campus",
      attendees: 120,
      featured: true,
    },
    {
      id: 3,
      date: "2026-04-15",
      title: "Tech Talk: The Future of AI in Education",
      time: "17:00 - 19:00",
      location: "Auditorium A",
      attendees: 80,
      featured: false,
    },
  ];

  const addToCalendar = (event: typeof upcomingEvents[0]) => {
    const eventDate = new Date(event.date + "T" + event.time.split(" - ")[0]);
    const endDate = new Date(event.date + "T" + event.time.split(" - ")[1]);

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${eventDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
SUMMARY:${event.title}
LOCATION:${event.location}
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
            Join the Claude Builder Club at African Leadership University. Where tech meets African excellence.
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
            <h2 className="text-4xl font-bold mb-3">What You Get</h2>
            <p className="text-muted-foreground text-lg">Just for attending a CBC meeting</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Perk 1 — Claude Pro */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-[#D97757]/50 transition-all group text-center">
              <div className="w-14 h-14 bg-[#D97757]/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-[#D97757]/20 transition-colors">
                <Gift size={28} className="text-[#D97757]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Free Claude Pro</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                5× more usage than the free tier. Access to Claude's most capable models including Sonnet and Opus.
              </p>
            </div>

            {/* Perk 2 — API Credits */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-[#D97757]/50 transition-all group text-center">
              <div className="w-14 h-14 bg-[#D97757]/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-[#D97757]/20 transition-colors">
                <Code2 size={28} className="text-[#D97757]" />
              </div>
              <h3 className="text-xl font-bold mb-3">$25 API Credits</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Build real apps with the Anthropic API. Claude Code access included — write, debug, and ship code directly from your terminal.
              </p>
            </div>

            {/* Perk 3 — Hackathon */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-[#D97757]/50 transition-all group text-center">
              <div className="w-14 h-14 bg-[#D97757]/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-[#D97757]/20 transition-colors">
                <Trophy size={28} className="text-[#D97757]" />
              </div>
              <h3 className="text-xl font-bold mb-3">End-of-Semester Hackathon</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Compete for prizes, build real projects, and show what you've learned. Open to all CBC members regardless of experience.
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
              Claim Your Perks — Join Now
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ───────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2">Upcoming Events</h2>
            <p className="text-muted-foreground">Don't miss out on what's next</p>
          </div>
          <Link
            to="/events"
            className="hidden sm:flex items-center gap-2 text-[#D97757] hover:underline"
          >
            View All
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className={`rounded-2xl p-6 transition-all group relative ${event.featured
                ? "bg-[#D97757]/5 border-2 border-[#D97757] hover:border-[#E08967]"
                : "bg-card border border-border hover:border-[#D97757]"
                }`}
            >
              {event.featured && (
                <div className="absolute -top-3.5 left-6">
                  <span className="bg-[#D97757] text-[#0D0D0D] text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                    ⭐ Season Finale
                  </span>
                </div>
              )}

              <div className="text-[#D97757] font-semibold mb-2">
                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <h3 className={`text-xl font-bold mb-4 transition-colors ${event.featured ? "text-foreground" : "group-hover:text-[#D97757]"}`}>
                {event.title}
              </h3>
              <div className="space-y-2 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span>{event.attendees} attending</span>
                </div>
              </div>
              <button
                onClick={() => addToCalendar(event)}
                className={`w-full py-2.5 rounded-xl font-semibold transition-all ${event.featured
                  ? "bg-[#D97757] text-[#0D0D0D] hover:bg-[#E08967]"
                  : "bg-secondary text-foreground hover:bg-[#D97757] hover:text-[#0D0D0D]"
                  }`}
              >
                Add to Calendar
              </button>
            </div>
          ))}
        </div>

        <Link
          to="/events"
          className="sm:hidden flex items-center justify-center gap-2 text-[#D97757] hover:underline mt-8"
        >
          View All Events
          <ArrowRight size={20} />
        </Link>
      </section>

      {/* ── Who We Are ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-card/50 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
          <div className="h-1 w-24 bg-[#D97757] mx-auto mb-8"></div>

          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            The Claude Builder Club at ALU is an inclusive community for students interested in exploring AI development, developing technical skills, and learning about the benefits and risks of AI.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-14">
            We don't just get answers from AI — <span className="text-foreground font-medium">we build AI-assisted solutions</span>. We teach students not just <em>how</em> to use Claude, but <em>when</em> and <em>why</em>. Through workshops, hackathons, and collaborative projects, members tackle real problems in health, education, and economic opportunity.
          </p>

          {/* 4 Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { emoji: "✅", title: "All are welcome", desc: "No CS degree needed. Any major, any skill level." },
              { emoji: "📚", title: "Continuous learners", desc: "Whether you've never coded or shipped apps for years — there's always more to learn." },
              { emoji: "💡", title: "Foster creativity", desc: "Build solutions for anything that sparks your interest." },
              { emoji: "🤝", title: "Fun & engaging", desc: "Connect with peers, learn from guest speakers, and enjoy the community." },
            ].map((v) => (
              <div key={v.title} className="bg-card border border-border rounded-2xl p-6 hover:border-[#D97757]/40 transition-all">
                <div className="text-3xl mb-3">{v.emoji}</div>
                <h4 className="font-bold text-foreground mb-2">{v.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
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
