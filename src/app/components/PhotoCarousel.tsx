import { useRef, useEffect } from "react";

// Width of each slide slot (image + gap). Adjust to taste.
const SLIDE_WIDTH = 420; // px
// Scroll speed in pixels per animation frame (~60fps)
const SPEED = 0.8;

export function PhotoCarousel() {
  const photos = [
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

  // Three copies so we always have content to the left and right when looping
  const tripled = [...photos, ...photos, ...photos];
  const origWidth = photos.length * SLIDE_WIDTH;

  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const animRef = useRef<number>(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Start inside copy #2 with a half-slide offset so the left edge is
    // already cut off when the page loads (both sides cut off from frame 0).
    posRef.current = -(origWidth + SLIDE_WIDTH / 2);
    track.style.transform = `translateX(${posRef.current}px)`;

    const tick = () => {
      if (!isDragging.current) {
        posRef.current -= SPEED;

        // Seamless reset: when we've scrolled through copy #2 entirely,
        // jump back by one origWidth — visually identical because copy #3
        // looks exactly like copy #2.
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

  // ── Drag handlers ───────────────────────────────────────────────────────────
  const normalize = (pos: number) => {
    // Keep position in the "copy #2" range so the loop never breaks
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
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - dragStartX.current;
    posRef.current = normalize(dragStartPos.current + delta);
    const track = trackRef.current;
    if (track) track.style.transform = `translateX(${posRef.current}px)`;
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      className="w-full overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div ref={trackRef} className="flex will-change-transform">
        {tripled.map((photo, index) => (
          <div
            key={index}
            style={{ width: SLIDE_WIDTH, flexShrink: 0 }}
            className="px-2"
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
  );
}
