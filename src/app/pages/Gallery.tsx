import { useState, useEffect, useCallback } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY PHOTOS
//
// Photos are served from /public and available at the paths below.
// To add new events: copy photos to public/<event-folder>/ and push
// new entries here with the matching url and event label.
// ─────────────────────────────────────────────────────────────────────────────
const galleryItems = [
  // CBC Kickoff — Feb 20, 2026
  // Info session: AI Fluency, Claude demo, cowork, 5-min hackathon, free Pro claim
  { id: 1, url: "/cbc-meeting-1/IMG_6927.jpg", title: "AI Fluency Session", event: "CBC Kickoff · Feb 2026" },
  { id: 2, url: "/cbc-meeting-1/IMG_7894.jpg", title: "AI Fluency Session", event: "CBC Kickoff · Feb 2026" },
  { id: 3, url: "/cbc-meeting-1/IMG_7950.jpg", title: "AI Fluency Session", event: "CBC Kickoff · Feb 2026" },
  { id: 4, url: "/cbc-meeting-1/IMG_7965.jpg", title: "AI Fluency Session", event: "CBC Kickoff · Feb 2026" },

  // Claude Code Workshop — Mar 6, 2026
  // Hands-on session with Chiagoziem: Claude Code setup, agentic coding, MCP
  { id: 5, url: "/cbc-meeting-2/0abf048f-3224-4153-aa78-08fbf40ea707.jpg", title: "Intro to Claude Code", event: "Claude Code Workshop · Mar 2026" },
  { id: 6, url: "/cbc-meeting-2/2a92db3b-b5c8-41eb-ba4b-6a219e28f92a.jpg", title: "Intro to Claude Code", event: "Claude Code Workshop · Mar 2026" },
  { id: 7, url: "/cbc-meeting-2/592f47e5-a09c-4585-b1d0-3277838d6eac.jpg", title: "Intro to Claude Code", event: "Claude Code Workshop · Mar 2026" },

  // Tabling 1
  { id: 8, url: "/tabling-1/IMG_0149.jpg", title: "Tabling", event: "Tabling 1" },
  { id: 9, url: "/tabling-1/IMG_0157.jpg", title: "Tabling", event: "Tabling 1" },
  { id: 10, url: "/tabling-1/IMG_7678.jpg", title: "Tabling", event: "Tabling 1" },
  { id: 11, url: "/tabling-1/IMG_7721.jpg", title: "Tabling", event: "Tabling 1" },

  // Tabling 2
  { id: 12, url: "/tabling-2/1e1f34bc-7bb0-46ac-a27e-0cd86067a49b.jpg", title: "Tabling", event: "Tabling 2" },
  { id: 13, url: "/tabling-2/78c81df2-0367-4147-860e-ca7d0be8921a.jpg", title: "Tabling", event: "Tabling 2" },
  { id: 14, url: "/tabling-2/95c8cfc4-87ca-4b60-b245-192d124c3850.jpg", title: "Tabling", event: "Tabling 2" },

  // Intro to MCP — Meeting 3
  { id: 15, url: "/cbc-meeting-3/IMG_1677.jpg", title: "Intro to MCP", event: "Intro to MCP · Mar 2026" },
  { id: 16, url: "/cbc-meeting-3/IMG_1683.jpg", title: "Intro to MCP", event: "Intro to MCP · Mar 2026" },

  // Tabling 3
  { id: 17, url: "/tabling-3/IMG_5295.jpg", title: "Tabling", event: "Tabling 3" },
  { id: 18, url: "/tabling-3/IMG_5298.jpg", title: "Tabling", event: "Tabling 3" },
];

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isOpen = lightboxIndex !== null;
  const total = galleryItems.length;

  const open = (i: number) => setLightboxIndex(i);
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
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") close();
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
      <section className="bg-gradient-to-b from-[#D97757]/10 to-transparent py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
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
              className="group relative overflow-hidden rounded-2xl border border-border hover:border-[#D97757] transition-all cursor-pointer"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                draggable={false}
              />
              {/* Hover overlay — always dark for text readability on images */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
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

          {/* Image */}
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
