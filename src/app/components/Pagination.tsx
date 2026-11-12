import { useEffect, useState, type RefObject } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Tailwind breakpoints (min-width, px) used to work out how many cards fit in two rows. */
const BREAKPOINTS = { md: 768, lg: 1024 } as const;

/**
 * Number of items that fill `rows` rows of a responsive grid.
 * `columns` gives the column count at each breakpoint, e.g. { base: 1, md: 2, lg: 3 }.
 */
export function useRowsPageSize(
  columns: { base: number; md?: number; lg?: number },
  rows = 2,
): number {
  const compute = () => {
    if (typeof window === "undefined") return columns.base * rows;
    const w = window.innerWidth;
    const cols =
      w >= BREAKPOINTS.lg ? columns.lg ?? columns.md ?? columns.base
      : w >= BREAKPOINTS.md ? columns.md ?? columns.base
      : columns.base;
    return cols * rows;
  };
  const [size, setSize] = useState(compute);
  useEffect(() => {
    const onResize = () => setSize(compute());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns.base, columns.md, columns.lg, rows]);
  return size;
}

/** Slices `items` into pages and keeps the current page in range when the page size changes. */
export function usePaged<T>(items: T[], pageSize: number) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);
  const current = Math.min(page, pageCount);
  const start = (current - 1) * pageSize;
  return { page: current, setPage, pageCount, pageItems: items.slice(start, start + pageSize) };
}

interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  /** Section to bring back into view when the page changes. */
  scrollTargetRef?: RefObject<HTMLElement | null>;
  label: string;
}

export function Pagination({ page, pageCount, onChange, scrollTargetRef, label }: PaginationProps) {
  if (pageCount <= 1) return null;

  const go = (p: number) => {
    onChange(p);
    const el = scrollTargetRef?.current;
    if (el && el.getBoundingClientRect().top < 0) {
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  };

  const arrow =
    "w-10 h-10 rounded-full flex items-center justify-center ring-1 ring-border text-foreground hover:ring-primary hover:text-primary transition-colors disabled:opacity-40 disabled:pointer-events-none";

  return (
    <nav aria-label={label} className="flex items-center justify-center gap-2 mt-10">
      <button type="button" className={arrow} onClick={() => go(page - 1)} disabled={page === 1} aria-label="Previous page">
        <ChevronLeft size={18} aria-hidden />
      </button>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => go(p)}
          aria-label={`Page ${p}`}
          aria-current={p === page ? "page" : undefined}
          className={`w-10 h-10 rounded-full text-sm font-semibold transition-colors ${
            p === page
              ? "bg-primary text-primary-foreground"
              : "ring-1 ring-border text-muted-foreground hover:ring-primary hover:text-primary"
          }`}
        >
          {p}
        </button>
      ))}
      <button type="button" className={arrow} onClick={() => go(page + 1)} disabled={page === pageCount} aria-label="Next page">
        <ChevronRight size={18} aria-hidden />
      </button>
      <span className="sr-only" aria-live="polite">
        Page {page} of {pageCount}
      </span>
    </nav>
  );
}
