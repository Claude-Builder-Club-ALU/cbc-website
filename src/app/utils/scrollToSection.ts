/** Scrolls to a section by id, respecting the visitor's reduced-motion setting. */
export function scrollToSection(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  return true;
}
