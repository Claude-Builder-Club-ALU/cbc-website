import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { JoinModalProvider } from "./JoinModal";
import { scrollToSection } from "../utils/scrollToSection";

/** On navigation, jump to the #section in the URL if there is one, otherwise to the top. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // Wait a frame so the new page has rendered its sections.
      const frame = requestAnimationFrame(() => {
        if (!scrollToSection(id)) window.scrollTo({ top: 0, behavior: "auto" });
      });
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);
  return null;
}

export function RootLayout() {
  return (
    <JoinModalProvider>
    <div className="min-h-screen bg-background text-foreground">
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
    </JoinModalProvider>
  );
}
