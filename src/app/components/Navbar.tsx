import { Link, useLocation } from "react-router";
import { Sun, Moon, HelpCircle, AlignJustify, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Events", path: "/events" },
  { name: "Projects", path: "/projects" },
  { name: "Gallery", path: "/gallery" },
  // { name: "Team", path: "/team" },
];

function NavLinks({ isActive, showBrand }: { isActive: (path: string) => boolean; showBrand: boolean }) {
  return (
    <div className="hidden md:flex flex-1 items-center gap-0 overflow-visible">
      {/* CBC @ ALU lockup — visible only on home when hero logo is showing */}
      <AnimatePresence initial={false}>
        {showBrand && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0 overflow-visible"
          >
            <span className="flex items-center pr-4 pointer-events-none select-none overflow-visible">
              <img
                src="/logos/alu-logo_for_white.png"
                alt="Claude Builder Club at African Leadership University"
                className="relative z-10 h-9 sm:h-10 md:h-11 lg:h-12 xl:h-14 w-auto max-w-[min(82vw,260px)] object-contain object-left drop-shadow-[0_2px_6px_rgba(0,0,0,0.1)] dark:hidden"
              />
              <img
                src="/logos/alu-logo.png"
                alt="Claude Builder Club at African Leadership University"
                className="relative z-10 hidden h-9 sm:h-10 md:h-11 lg:h-12 xl:h-14 w-auto max-w-[min(82vw,260px)] object-contain object-left dark:block drop-shadow-[0_0_22px_rgba(255,255,255,0.09)]"
              />
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className="relative px-3 py-1.5 text-sm font-medium"
        >
          {isActive(link.path) && (
            <motion.span
              layoutId="nav-active-pill"
              className="absolute inset-0 bg-[#D97757]/10 rounded-lg"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span
            className={`relative z-10 transition-colors duration-200 ${
              isActive(link.path) ? "text-[#D97757]" : "text-foreground hover:text-[#D97757]"
            }`}
          >
            {link.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

export function Logo() {
  return (
    <Link to="/" className="flex items-center flex-col max-md:items-start gap-2.5 group">
      {/* <div className="flex items-center gap-1.5">
        <div className="w-9 h-9 rounded-lg bg-[#D97757] flex items-center justify-center shadow-md shadow-[#D97757]/20">
          <span className="text-xs font-bold text-[#0D0D0D]">ALU</span>
        </div>
        <span className="text-muted-foreground text-sm select-none">×</span>
        <div className="w-9 h-9 rounded-lg bg-[#D97757] flex items-center justify-center shadow-md shadow-[#D97757]/20">
          <span className="text-sm font-bold text-[#0D0D0D]">C</span>
        </div>
      </div>
      <div className="hidden sm:block leading-tight">
        <div className="font-bold text-sm group-hover:text-[#D97757] transition-colors duration-200">CBC</div>
        <div className="text-xs text-muted-foreground">Claude Builder Club</div>
      </div> */}
      <img src="/logos/alu_colored.png" alt="ALU" className="h-[18px] max-md:h-5 dark:hidden" />
      <img src="/logos/alu_white.png" alt="ALU" className="h-[18px] max-md:h-5 hidden dark:flex" />
      <img src="/logos/claude_colored.png" alt="Claude" className="h-[20px] max-md:h-5 dark:hidden" />
      <img src="/logos/claude_white.png" alt="Claude" className="h-[20px] max-md:h-5 hidden dark:flex" />
    </Link>
  );
}

function ThemeToggleButton({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !resolvedTheme) {
    return null;
  }

  const isDark = resolvedTheme === "dark";
  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`flex items-center gap-2.5 w-full px-3 py-2 cursor-pointer rounded-md hover:bg-secondary/50 max-md:hover:bg-secondary max-md:py-2.5 dark:hover:bg-secondary transition-colors text-sm text-foreground ${className}`}
      whileTap={{ scale: 0.97 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
        >
          {isDark ? <Sun size={15} className="text-[#D97757] fill-[#D97757]" /> : <Moon size={15} className="text-[#D97757] fill-[#D97757]" />}
        </motion.span>
      </AnimatePresence>
      <span>{isDark ? "Light mode" : "Dark mode"}</span>
    </motion.button>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const desktopMenuRef = useRef<HTMLDivElement>(null);

  const isHome = location.pathname === "/";
  const [navLogoVisible, setNavLogoVisible] = useState(!isHome);

  // Hide navbar logo while the hero logo is visible on the home page
  useEffect(() => {
    if (!isHome) {
      setNavLogoVisible(true);
      return;
    }
    setNavLogoVisible(false);
    const heroLogo = document.getElementById("hero-logo");
    if (!heroLogo) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNavLogoVisible(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px" }
    );
    observer.observe(heroLogo);
    return () => observer.disconnect();
  }, [isHome]);

  const isActive = (path: string) => location.pathname.startsWith(path);

  // Scroll detection for background opacity
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close desktop menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (desktopMenuRef.current && !desktopMenuRef.current.contains(e.target as Node)) {
        setDesktopMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setDesktopMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`sticky top-0 z-50 overflow-visible transition-all duration-300
         ${scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-background/95 border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
        <div className="flex items-center h-20 overflow-visible">

          {/* ── Mobile: Logo left ── */}
          <div className="flex-1 md:hidden">
            <Logo />
          </div>

          {/* ── Desktop left: Nav links ── */}
          <NavLinks isActive={isActive} showBrand={isHome && !navLogoVisible} />

          {/* ── Desktop center: Logo ── */}
          <div className="hidden md:flex flex-1 justify-center">
            <AnimatePresence>
              {navLogoVisible && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -6 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Logo />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Desktop right: Join + Menu ── */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-2">
            <motion.a
              href="https://www.jotform.com/253555944387168"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#D97757] text-[#ffffff] px-5 py-2 rounded-xl text-sm font-semibold hover:bg-[#E08967] transition-colors shadow-sm shadow-[#D97757]/20"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
            >
              Join the Club
            </motion.a>

            {/* Desktop hamburger menu */}
            <div className="relative" ref={desktopMenuRef}>
              <motion.button
                onClick={() => setDesktopMenuOpen((v) => !v)}
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-border hover:border-[#D97757]/50 hover:bg-secondary transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="More options"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={desktopMenuOpen ? "x" : "menu"}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.1 }}
                  >
                    {desktopMenuOpen
                      ? <X size={18} />
                      : <AlignJustify size={18} />
                    }
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              <AnimatePresence>
                {desktopMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -8 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 top-full mt-2 w-52 bg-card border border-border rounded-2xl shadow-xl shadow-black/10 overflow-hidden p-1.5"
                  >
                    <Link
                      to="/faq"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-md hover:bg-secondary/50 dark:hover:bg-secondary transition-colors font-medium text-sm text-foreground"
                      onClick={() => setDesktopMenuOpen(false)}
                    >
                      {/* <HelpCircle size={15} className="text-[#D97757]" /> */}
                      <span>FAQ</span>
                    </Link>
                    <div className="flex items-center justify-center gap-2 px-1">
                      <p className="text-xs text-muted-foreground">Theme</p>
                      <div className="h-px flex-1 bg-border my-1" />
                    </div>
                    <ThemeToggleButton />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Mobile: Hamburger button ── */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setMobileOpen((v) => !v)}
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-border hover:border-[#D97757]/50 hover:bg-secondary transition-all"
              whileTap={{ scale: 0.93 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.18 }}
                >
                  {mobileOpen ? <X size={20} /> : <AlignJustify size={20} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="px-4 py-5 flex flex-col gap-0.5">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 + i * 0.045, duration: 0.22 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 px-3 rounded-md hover:bg-secondary/50 max-md:hover:bg-secondary py-2.5 text-sm font-medium transition-colors ${isActive(link.path)
                        ? "text-[#D97757] bg-[#D97757]/10"
                        : "text-foreground hover:bg-secondary hover:text-[#D97757]"
                      }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.03 + navLinks.length * 0.045, duration: 0.22 }}
              >
                <Link
                  to="/faq"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 px-3 rounded-md hover:bg-secondary/50 max-md:hover:bg-secondary py-2.5 text-sm font-medium transition-colors ${isActive("/faq")
                      ? "text-[#D97757] bg-[#D97757]/10"
                      : "text-foreground hover:bg-secondary hover:text-[#D97757]"
                    }`}
                >
                  {/* <HelpCircle size={15} className="text-[#D97757]" /> */}
                  FAQ
                </Link>
              </motion.div>

              <div className="h-px bg-border my-2" />

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.03 + (navLinks.length + 1) * 0.045, duration: 0.22 }}
              >
                <ThemeToggleButton />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 + (navLinks.length + 2) * 0.045, duration: 0.22 }}
                className="mt-2"
              >
                <a
                  href="https://www.jotform.com/253555944387168"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center bg-[#D97757] text-[#fbfbfb] px-6 py-3 rounded-xl font-semibold hover:bg-[#E08967] transition-colors shadow-sm shadow-[#D97757]/20"
                >
                  Join the Club
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
