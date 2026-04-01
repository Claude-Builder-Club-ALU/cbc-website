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
    // CBC Kickoff — Feb 20, 2026
    { url: "/cbc-meeting-1/IMG_6927.jpg", caption: "CBC Kickoff · Feb 2026" },
    { url: "/cbc-meeting-1/IMG_7950.jpg", caption: "AI Fluency & Claude Demo · CBC Kickoff" },
    // Claude Code Workshop — Mar 6, 2026 (with Alex Notov, Anthropic)
    { url: "/cbc-meeting-2/0abf048f-3224-4153-aa78-08fbf40ea707.jpg", caption: "Intro to Claude Code · Mar 2026" },
    { url: "/cbc-meeting-2/2a92db3b-b5c8-41eb-ba4b-6a219e28f92a.jpg", caption: "Live Coding with Claude Code" },
    // Tabling
    { url: "/tabling-1/IMG_7721.jpg", caption: "Tabling · ALU Campus" },
    { url: "/tabling-1/IMG_0149.jpg", caption: "Tabling · ALU Campus" },
    { url: "/tabling-2/1e1f34bc-7bb0-46ac-a27e-0cd86067a49b.jpg", caption: "Tabling · ALU Campus" },
    { url: "/tabling-2/78c81df2-0367-4147-860e-ca7d0be8921a.jpg", caption: "Tabling · ALU Campus" },
    // Intro to MCP (Meeting 3)
    { url: "/cbc-meeting-3/IMG_1677.jpg", caption: "Intro to MCP · CBC Meeting 3" },
    // Tabling 3
    { url: "/tabling-3/IMG_5295.jpg", caption: "Tabling · ALU Campus" },
  ];

  const tripled = [...photos, ...photos, ...photos];
  const origWidth = photos.length * SLIDE_WIDTH;

  // ── Lightbox state ──────────────────────────────────────────────────────────
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const lightboxOpen = useRef(false);

  useEffect(() => {
    lightboxOpen.current = lightbox !== null;
  }, [lightbox]);

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

  const onPointerUp = (_e: React.PointerEvent, photo: Photo) => {
    isDragging.current = false;
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
              <div className="relative h-72 rounded-2xl overflow-hidden group border border-border">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  draggable={false}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                />
                {/* Caption overlay — always dark for readability on images */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
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
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors bg-black/40 rounded-full p-2"
            aria-label="Close"
          >
            <X size={28} />
          </button>

          <img
            src={lightbox.url}
            alt={lightbox.caption}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            draggable={false}
          />

          <p className="absolute bottom-6 text-white/80 text-sm font-medium tracking-wide">
            {lightbox.caption}
          </p>
        </div>
      )}
    </>
  );
}
