import { useState, useEffect, useCallback } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY PHOTOS
//
// No category filter — categories were arbitrary and tedious to maintain.
// Instead, each photo has an optional `event` label (e.g. "CBC Meeting 2")
// which shows up in the lightbox caption. This matches how you already
// organize photos in your Drive folder. To add new photos, just push to
// this array — no classification schema to maintain.
// ─────────────────────────────────────────────────────────────────────────────
const galleryItems = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1562910859-be83f1df7b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdW5pdmVyc2l0eSUyMHN0dWRlbnRzJTIwdGVjaCUyMHdvcmtzaG9wJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NzM4NjY3NTB8MA&ixlib=rb-4.1.0&q=80&w=800",
    title: "AI Workshop: Introduction to Claude",
    event: "CBC Meeting 1",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1710770563074-6d9cc0d3e338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHN0dWRlbnRzJTIwY29kaW5nJTIwaGFja2F0aG9uJTIwZ3JvdXB8ZW58MXx8fHwxNzczODY2NzUwfDA&ixlib=rb-4.1.0&q=80&w=800",
    title: "Winter Hackathon 2026",
    event: "Hackathon · Feb 2026",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1770364292936-1800aa621b3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2x1YiUyMHRlYW0lMjBwaG90byUyMGRpdmVyc2UlMjBzdHVkZW50c3xlbnwxfHx8fDE3NzM4NjY3NTJ8MA&ixlib=rb-4.1.0&q=80&w=800",
    title: "CBC Team Photo",
    event: "CBC Meeting 2",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1646579885920-0c9a01cb7078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGFpJTIwd29ya3Nob3AlMjBsYXB0b3AlMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzczODY2NzUyfDA&ixlib=rb-4.1.0&q=80&w=800",
    title: "Building with Claude API",
    event: "CBC Meeting 2",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1768796370577-c6e8b708b980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjB3b3Jrc2hvcCUyMHByZXNlbnRhdGlvbiUyMHNjcmVlbiUyMHN0dWRlbnRzfGVufDF8fHx8MTc3Mzg2Njc1Nnww&ixlib=rb-4.1.0&q=80&w=800",
    title: "Tech Talk: Future of AI",
    event: "CBC Meeting 3",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1560651921-19590b2b7ad7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjB0ZWFtJTIwY29kaW5nJTIwdG9nZXRoZXIlMjBuaWdodHxlbnwxfHx8fDE3NzM4NjY3NTZ8MA&ixlib=rb-4.1.0&q=80&w=800",
    title: "Late Night Build Session",
    event: "Hackathon · Feb 2026",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2xhc3Nyb29tJTIwd29ya3Nob3AlMjB0ZWNobm9sb2d5JTIwbGVhcm5pbmd8ZW58MXx8fHwxNzczODY2NzU2fDA&ixlib=rb-4.1.0&q=80&w=800",
    title: "Classroom Workshop",
    event: "CBC Meeting 1",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1758270705317-3ef6142d306f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudCUyMGdyb3VwJTIwcHJvamVjdCUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzczODY2NzU2fDA&ixlib=rb-4.1.0&q=80&w=800",
    title: "Group Collaboration",
    event: "Tabling 1",
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1742934029147-6f83f681daa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjBlbmdpbmVlciUyMHRlY2hub2xvZ3klMjBzbWlsaW5nfGVufDF8fHx8MTc3Mzg2Njc1Mnww&ixlib=rb-4.1.0&q=80&w=800",
    title: "Project Showcase",
    event: "CBC Meeting 3",
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1596580817363-a4a8f67d4bc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMG1hbiUyMHNvZnR3YXJlJTIwZGV2ZWxvcGVyJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzczODY2NzUyfDA&ixlib=rb-4.1.0&q=80&w=800",
    title: "Member Spotlight",
    event: "CBC Meeting 2",
  },
  {
    id: 11,
    url: "https://images.unsplash.com/photo-1760433403526-47f671997ca1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3R1ZGVudCUyMGxlYWRlciUyMGNvbmZpZGVudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3Mzg2Njc1Mnww&ixlib=rb-4.1.0&q=80&w=800",
    title: "Leadership Team",
    event: "Tabling 1",
  },
  {
    id: 12,
    url: "https://images.unsplash.com/photo-1652772589253-c1ab2308fbf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNvZnR3YXJlJTIwZW5naW5lZXIlMjBwb3J0cmFpdCUyMHNtaWxpbmd8ZW58MXx8fHwxNzczODY2NzU3fDA&ixlib=rb-4.1.0&q=80&w=800",
    title: "Coding Together",
    event: "CBC Meeting 3",
  },
];

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isOpen = lightboxIndex !== null;
  const total  = galleryItems.length;

  const open  = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex(i => (i === null ? null : (i - 1 + total) % total));
  }, [total]);

  const next = useCallback(() => {
    setLightboxIndex(i => (i === null ? null : (i + 1) % total));
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, prev, next]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const current = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-[#D97757]/10 to-transparent py-20 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Gallery</h1>
          <p className="text-xl text-[#9CA3AF] max-w-2xl">
            Moments that matter — from our meetings, workshops, and events.
          </p>
        </div>
      </section>

      {/* ── Masonry grid ── */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 640: 2, 1024: 3 }}>
        <Masonry gutter="1rem">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => open(index)}
              className="group relative overflow-hidden rounded-2xl border border-[#2A2A2A] hover:border-[#D97757] transition-all cursor-pointer"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                draggable={false}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/90 via-[#0D0D0D]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <p className="text-white font-semibold text-sm leading-snug">{item.title}</p>
                {item.event && (
                  <p className="text-[#D97757] text-xs mt-1 font-medium">{item.event}</p>
                )}
              </div>
            </div>
          ))}
        </Masonry>
        </ResponsiveMasonry>
      </section>

      {/* ── Lightbox ── */}
      {isOpen && current && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={close}
        >
          {/* Close button */}
          <button
            className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors bg-white/10 rounded-full p-2 z-10"
            onClick={close}
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium">
            {(lightboxIndex ?? 0) + 1} / {total}
          </div>

          {/* Prev arrow */}
          <button
            className="absolute left-4 md:left-8 text-white/60 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-3 z-10"
            onClick={e => { e.stopPropagation(); prev(); }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Image — clicking it does NOT close (stopPropagation) */}
          <img
            src={current.url}
            alt={current.title}
            className="max-w-[85vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
            draggable={false}
            onClick={e => e.stopPropagation()}
          />

          {/* Next arrow */}
          <button
            className="absolute right-4 md:right-8 text-white/60 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-3 z-10"
            onClick={e => { e.stopPropagation(); next(); }}
            aria-label="Next photo"
          >
            <ChevronRight size={28} />
          </button>

          {/* Caption */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <p className="text-white font-semibold text-sm">{current.title}</p>
            {current.event && (
              <p className="text-[#D97757] text-xs mt-1">{current.event}</p>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
