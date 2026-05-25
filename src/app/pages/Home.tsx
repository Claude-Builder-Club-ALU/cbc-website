import { Link } from "react-router";
import { ArrowRight, User, Star, BookOpen, Heart, Gift, Code2, Trophy, Shield, Zap, Globe } from "lucide-react";
import { PhotoCarousel } from "../components/PhotoCarousel";
import { TestimonialCarousel } from "../components/TestimonialCarousel";
import { LogoPool } from "../components/LogoPool";
import { UpcomingEventsBlock } from "../components/UpcomingEventsBlock";

export function Home() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D97757]/5 via-transparent to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">

          {/* ── Desktop center: Logo ── */}
          <div id="hero-logo" className="hidden md:flex flex-1 justify-center mb-4 ">
            {/* <Logo /> */}
            <Link to="/" className="flex items-center max-md:items-start group md:translate-x-4">
              <img src="/logos/alu_colored.png" alt="ALU" className="h-8 max-md:h-5 dark:hidden" />
              <img src="/logos/alu_white.png" alt="ALU" className="h-8 max-md:h-5 hidden dark:flex" />
              <img src="/logos/cbc-logo_coloured.png" alt="Claude Builder Club" className="h-20 max-md:h-5 dark:hidden" />
              <img src="/logos/cbc-logo.png" alt="Claude Builder Club" className="h-20 max-md:h-5 hidden dark:flex" />
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

      <UpcomingEventsBlock />

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
      {/* <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Members Say</h2>
          <TestimonialCarousel />
        </div>
      </section> */}
    </div>
  );
}
