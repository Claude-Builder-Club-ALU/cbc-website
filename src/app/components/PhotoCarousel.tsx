import { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";

// Width of each slide slot (image + gap). Adjust to taste.
const SLIDE_WIDTH = 320; // px
// Scroll speed in pixels per animation frame (~60fps)
const SPEED = 0.8;

interface Photo {
  url: string;
  caption: string;
}

export function PhotoCarousel() {
  const photos: Photo[] = [
    {
      url: "https://images.unsplash.com/photo-1562910859-be83f1df7b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdW5pdmVyc2l0eSUyMHN0dWRlbnRzJTIwdGVjaCUyMHdvcmtzaG9wJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NzM4NjY3NTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Workshop: Introduction to AI",
    },
    {
      url: "https://images.unsplash.com/photo-1710770563074-6d9cc0d3e338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHN0dWRlbnRzJTIwY29kaW5nJTIwaGFja2F0aG9uJTIwZ3JvdXB8ZW58MXx8fHwxNzczODY2NzUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Annual Hackathon 2025",
    },
    {
      url: "https://images.unsplash.com/photo-1646579885920-0c9a01cb7078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGFpJTIwd29ya3Nob3AlMjBsYXB0b3AlMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzczODY2NzUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Building with Claude API",
    },
    {
      url: "https://images.unsplash.com/photo-1770364292936-1800aa621b3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2x1YiUyMHRlYW0lMjBwaG90byUyMGRpdmVyc2UlMjBzdHVkZW50c3xlbnwxfHx8fDE3NzM4NjY3NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "CBC Team Meetup",
    },
    {
      url: "https://images.unsplash.com/photo-1768796370577-c6e8b708b980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjB3b3Jrc2hvcCUyMHByZXNlbnRhdGlvbiUyMHNjcmVlbiUyMHN0dWRlbnRzfGVufDF8fHx8MTc3Mzg2Njc1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Tech Talk: AI in Education",
    },
    {
      url: "https://images.unsplash.com/photo-1560651921-19590b2b7ad7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjB0ZWFtJTIwY29kaW5nJTIwdG9nZXRoZXIlMjBuaWdodHxlbnwxfHx8fDE3NzM4NjY3NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Late Night Coding Session",
    },
  ];

  const tripled = [...photos, ...photos, ...photos];
  const origWidth = photos.length * SLIDE_WIDTH;

  // ── Lightbox state ──────────────────────────────────────────────────────────
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  // Ref so the rAF loop can check it without a stale closure
  const lightboxOpen = useRef(false);

  // Keep the ref in sync with state
  useEffect(() => {
    lightboxOpen.current = lightbox !== null;
  }, [lightbox]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ── Carousel animation ──────────────────────────────────────────────────────
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const animRef = useRef<number>(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);
  // Track drag distance to distinguish a click from a real drag
  const dragDistance = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    posRef.current = -(origWidth + SLIDE_WIDTH / 2);
    track.style.transform = `translateX(${posRef.current}px)`;

    const tick = () => {
      if (!isDragging.current && !lightboxOpen.current) {
        posRef.current -= SPEED;
        if (posRef.current < -(origWidth * 2)) {
          posRef.current += origWidth;
        }
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [origWidth]);

  // ── Drag / click handlers ───────────────────────────────────────────────────
  const normalize = (pos: number) => {
    let p = pos;
    while (p > -origWidth) p -= origWidth;
    while (p < -(origWidth * 2)) p += origWidth;
    return p;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartPos.current = posRef.current;
    dragDistance.current = 0;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - dragStartX.current;
    dragDistance.current = Math.abs(delta);
    posRef.current = normalize(dragStartPos.current + delta);
    const track = trackRef.current;
    if (track) track.style.transform = `translateX(${posRef.current}px)`;
  };

  const onPointerUp = (e: React.PointerEvent, photo: Photo) => {
    isDragging.current = false;
    // Only open lightbox if the pointer barely moved (it was a tap/click, not a drag)
    if (dragDistance.current < 6) {
      setLightbox(photo);
    }
  };

  return (
    <>
      {/* ── Carousel ─────────────────────────────────────────────────────────── */}
      <div className="w-full overflow-hidden select-none cursor-grab active:cursor-grabbing">
        <div ref={trackRef} className="flex will-change-transform">
          {tripled.map((photo, index) => (
            <div
              key={index}
              style={{ width: SLIDE_WIDTH, flexShrink: 0 }}
              className="px-2"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={(e) => onPointerUp(e, photo)}
              onPointerCancel={() => { isDragging.current = false; }}
            >
              <div className="relative h-72 rounded-2xl overflow-hidden group border border-[#2A2A2A]">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  draggable={false}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                />
                {/* Caption overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-semibold">{photo.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          {/* Close button — clicking it also bubbles up and closes via the overlay onClick */}
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors bg-black/40 rounded-full p-2"
            aria-label="Close"
          >
            <X size={28} />
          </button>

          {/* Image — click on it also closes (event bubbles to overlay) */}
          <img
            src={lightbox.url}
            alt={lightbox.caption}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            draggable={false}
          />

          {/* Caption */}
          <p className="absolute bottom-6 text-white/80 text-sm font-medium tracking-wide">
            {lightbox.caption}
          </p>
        </div>
      )}
    </>
  );
}
