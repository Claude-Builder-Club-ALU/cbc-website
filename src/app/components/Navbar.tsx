import { useJoinModal } from "./JoinModal";
import { Link, useLocation } from "react-router";
import { Sun, Moon, AlignJustify, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "../utils/scrollToSection";

const ABOUT_PATH = "/#about";

const navLinks = [
  { name: "About", path: ABOUT_PATH },
  { name: "Events", path: "/events" },
  { name: "Projects", path: "/projects" },
  { name: "Gallery", path: "/gallery" },
  // { name: "Team", path: "/team" },
];

/** "About" points at a home-page section; when already on Home, scroll there smoothly. */
function scrollIfAboutOnHome(path: string, pathname: string) {
  if (path === ABOUT_PATH && pathname === "/") scrollToSection("about");
}

function NavLinks({ isActive, showBrand }: { isActive: (path: string) => boolean; showBrand: boolean }) {
  const { pathname } = useLocation();
  return (
    <div className="hidden md:flex flex-1 items-center gap-0 overflow-visible">
      {/* CBC @ ALU lockup: links home; hidden while center wordmarks show (scroll down) */}
      <AnimatePresence initial={false}>
        {showBrand && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0 overflow-visible"
          >
            <Link
              to="/"
              className="flex items-center mr-5 overflow-visible shrink-0 rounded-md outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              aria-label="Claude Builder Club at ALU, home"
            >
              <img
                src="/logos/cbc-logo_coloured.png"
                alt=""
                className="relative z-10 h-10 lg:h-11 w-auto max-w-[min(82vw,260px)] object-contain object-left drop-shadow-[0_2px_6px_rgba(0,0,0,0.1)] dark:hidden"
              />
              <img
                src="/logos/cbc-logo.png"
                alt=""
                className="relative z-10 hidden h-10 lg:h-11 w-auto max-w-[min(82vw,260px)] object-contain object-left dark:block drop-shadow-[0_0_22px_rgba(255,255,255,0.09)]"
              />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          onClick={() => scrollIfAboutOnHome(link.path, pathname)}
          aria-current={isActive(link.path) ? "page" : undefined}
          className="relative px-2.5 lg:px-3 py-1.5 text-sm font-medium whitespace-nowrap"
        >
          {isActive(link.path) && (
            <motion.span
              layoutId="nav-active-pill"
              className="absolute inset-0 bg-primary/10 rounded-lg"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span
            className={`relative z-10 transition-colors duration-200 ${
              isActive(link.path) ? "text-primary" : "text-foreground hover:text-primary"
            }`}
          >
            {link.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

/** Center nav ALU × Claude stack. Not a link when `linkToHome` is false (desktop). Mobile keeps home link. */
export function Logo({ linkToHome = true }: { linkToHome?: boolean }) {
  const inner = (
    <>
      {/* <div className="flex items-center gap-1.5">
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-md shadow-primary/20">
          <span className="text-xs font-bold text-[#0D0D0D]">ALU</span>
        </div>
        <span className="text-muted-foreground text-sm select-none">×</span>
        <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-md shadow-primary/20">
          <span className="text-sm font-bold text-[#0D0D0D]">C</span>
        </div>
      </div>
      <div className="hidden sm:block leading-tight">
        <div className="font-bold text-sm group-hover:text-primary transition-colors duration-200">CBC</div>
        <div className="text-xs text-muted-foreground">Claude Builder Club</div>
      </div> */}
      <img src="/logos/cbc-logo_coloured.png" alt="Claude Builder Club" className="h-9 md:h-10 w-auto dark:hidden" />
      <img src="/logos/cbc-logo.png" alt="Claude Builder Club" className="h-9 md:h-10 w-auto hidden dark:block" />
      <span aria-hidden className="alu-mark h-7 w-0.5 rounded-full bg-foreground/40" />
      <img src="/logos/alu_colored.png" alt="African Leadership University" className="alu-mark h-4 md:h-[18px] w-auto dark:hidden" />
      <img src="/logos/alu_white.png" alt="African Leadership University" className="alu-mark h-4 md:h-[18px] w-auto hidden dark:block" />
    </>
  );

  const className =
    "flex items-center gap-3 group";

  if (linkToHome) {
    return (
      <Link to="/" className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}

/** Compact sun/moon button for the desktop navbar. */
function ThemeIconButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Keep the slot's width while the theme is unknown so the navbar doesn't shift.
  if (!mounted || !resolvedTheme) return <span className="w-10 h-10" aria-hidden />;

  const isDark = resolvedTheme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";
  return (
    <motion.button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="w-10 h-10 rounded-xl flex items-center justify-center text-foreground hover:text-primary hover:bg-secondary transition-colors cursor-pointer"
      whileTap={{ scale: 0.92 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.12, ease: "easeInOut" }}
          className="flex"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
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
          {isDark ? <Sun size={15} className="text-primary fill-primary" /> : <Moon size={15} className="text-primary fill-primary" />}
        </motion.span>
      </AnimatePresence>
      <span>{isDark ? "Light mode" : "Dark mode"}</span>
    </motion.button>
  );
}

export function Navbar() {
  const openJoin = useJoinModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  /**
   * Scroll **down** → center ALU×Claude wordmarks visible, left CBC lockup hidden.
   * Scroll **up** → left lockup visible, center hidden. Same on every route.
   */
  const [scrollShowsCenterLogo, setScrollShowsCenterLogo] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = typeof window !== "undefined" ? window.scrollY : 0;
    setScrollShowsCenterLogo(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastScrollY.current;
      lastScrollY.current = y;

      if (Math.abs(dy) < 6) return;

      if (dy > 0) {
        setScrollShowsCenterLogo(true);
      } else {
        setScrollShowsCenterLogo(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showLeftCbcLockup = !scrollShowsCenterLogo;
  const showCenterWordmarks = scrollShowsCenterLogo;

  // Highlight "About" while the About / What we do sections fill the middle of the screen.
  const [aboutInView, setAboutInView] = useState(false);
  useEffect(() => {
    setAboutInView(false);
    if (location.pathname !== "/") return;
    const sections = document.querySelectorAll<HTMLElement>('[data-nav-section="about"]');
    if (!sections.length) return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setAboutInView(visible.size > 0);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  const isActive = (path: string) =>
    path === ABOUT_PATH
      ? location.pathname === "/" && aboutInView
      : location.pathname.startsWith(path);

  // Scroll detection for background opacity
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
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
          <NavLinks isActive={isActive} showBrand={showLeftCbcLockup} />

          {/* ── Desktop center: Logo ── */}
          <div className="hidden md:flex flex-1 justify-center">
            <AnimatePresence>
              {showCenterWordmarks && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -6 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Below 1024px only the CBC mark fits between the links and FAQ */}
                  <div className="max-lg:[&_.alu-mark]:!hidden">
                    <Logo linkToHome={false} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Desktop right: FAQ, theme, Join ── */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-1">
            <Link
              to="/faq"
              aria-current={isActive("/faq") ? "page" : undefined}
              className={`relative px-2.5 lg:px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                isActive("/faq") ? "text-primary bg-primary/10" : "text-foreground hover:text-primary"
              }`}
            >
              FAQ
            </Link>

            <ThemeIconButton />

            <motion.button
              type="button"
              onClick={openJoin}
              aria-haspopup="dialog"
              className="ml-1 lg:ml-2 shrink-0 whitespace-nowrap bg-primary text-primary-foreground px-4 lg:px-5 py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
            >
              Join the Club
            </motion.button>
          </div>

          {/* ── Mobile: Hamburger button ── */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setMobileOpen((v) => !v)}
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-border hover:border-primary/50 hover:bg-secondary transition-all"
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
      {/* The open menu pushes the page down; once it has closed, re-align any #section target. */}
      <AnimatePresence
        onExitComplete={() => {
          if (window.location.hash) scrollToSection(decodeURIComponent(window.location.hash.slice(1)));
        }}
      >
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
                    onClick={() => {
                      setMobileOpen(false);
                      scrollIfAboutOnHome(link.path, location.pathname);
                    }}
                    className={`flex items-center gap-2 px-3 rounded-md hover:bg-secondary/50 max-md:hover:bg-secondary py-2.5 text-sm font-medium transition-colors ${isActive(link.path)
                        ? "text-primary bg-primary/10"
                        : "text-foreground hover:bg-secondary hover:text-primary"
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
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:bg-secondary hover:text-primary"
                    }`}
                >
                  {/* <HelpCircle size={15} className="text-primary" /> */}
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
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => {
                    setMobileOpen(false);
                    openJoin();
                  }}
                  className="block w-full text-center bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
                >
                  Join the Club
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
