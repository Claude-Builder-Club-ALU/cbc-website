import { useEffect, useRef } from "react";

// ── Physics constants ──────────────────────────────────────────────────────
const COUNT         = 70;    // number of logo bodies in the simulation
const GRAVITY       = 0.18;  // downward acceleration per frame
const BOUNCE        = 0.45;  // velocity retained after hitting a wall or floor
const FRICTION      = 0.76;  // horizontal slowdown when sliding on the floor
const ROT_FRICTION  = 0.73;  // rotational slowdown when resting on the floor
const MIN_BOUNCE_V  = 0.5;   // vertical speed below which floor bounce is suppressed
const HOVER_RADIUS  = 90;   // repulsion zone radius (px)
const HOVER_FORCE   = 0.60;  // impulse strength applied when cursor is near
const SEP_PADDING   = 8;     // extra gap between bodies beyond their sizes
const SEP_FORCE     = 0.18;  // separation push strength between overlapping bodies
const TARGET_ALPHA  = 0.9;   // max opacity when logo is closest to cursor
const MIN_ALPHA     = 0.0;  // baseline opacity when far from cursor
const REVEAL_RADIUS = 80;    // distance (px) at which logos reach full TARGET_ALPHA
const ALPHA_EASE    = 0.1;   // how fast alpha interpolates toward target per frame

interface Body {
  x: number; y: number;
  vx: number; vy: number;
  rot: number; rv: number;
  size: number;
  alpha: number;   // current rendered opacity (smoothly interpolated)
}

// Module-level: survives component unmount/remount
let persistedBodies: Body[] | null = null;

export function LogoPool({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Image ────────────────────────────────────────────────────────────────
    const img = new Image();
    img.src = "/logos/claude_logo.png";

    // ── Canvas sizing ────────────────────────────────────────────────────────
    let W = 0, H = 0;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // ── Bodies ───────────────────────────────────────────────────────────────
    const makeBody = (): Body => {
      const size = 28 + Math.random() * 18;
      return {
        x:     Math.random() * W,
        y:     -(size + Math.random() * H * 0.8),
        vx:    (Math.random() - 0.5) * 1.5,
        vy:    Math.random() * 1.2,
        rot:   Math.random() * Math.PI * 2,
        rv:    (Math.random() - 0.5) * 0.06,
        size,
        alpha: 0,
      };
    };

    const bodies: Body[] = persistedBodies ?? Array.from({ length: COUNT }, makeBody);

    // ── Mouse position (local to canvas) ────────────────────────────────────
    let mx = -9999, my = -9999;

    const toLocal = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect();
      return { x: clientX - r.left, y: clientY - r.top };
    };

    const onMouseMove  = (e: MouseEvent) => { const p = toLocal(e.clientX, e.clientY); mx = p.x; my = p.y; };
    const onMouseLeave = () => { mx = -9999; my = -9999; };
    const onTouchMove  = (e: TouchEvent) => { const p = toLocal(e.touches[0].clientX, e.touches[0].clientY); mx = p.x; my = p.y; };
    const onTouchEnd   = () => { mx = -9999; my = -9999; };

    canvas.addEventListener("mousemove",  onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchmove",  onTouchMove, { passive: true });
    canvas.addEventListener("touchend",   onTouchEnd);
    window.addEventListener("resize",     resize);

    // ── Draw one body ────────────────────────────────────────────────────────
    const drawBody = (b: Body) => {
      if (b.alpha <= 0.005) return;
      const s = b.size;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot);
      if (img.complete && img.naturalWidth) {
        ctx.globalAlpha = b.alpha;
        // ctx.filter = "saturate(1)";
        ctx.drawImage(img, -s / 2, -s / 2, s, s);
        ctx.filter = "none";
      } else {
        ctx.globalAlpha = b.alpha;
        ctx.fillStyle   = "#888";
        ctx.beginPath();
        ctx.roundRect(-s / 2, -s / 2, s, s, s * 0.2);
        ctx.fill();
        ctx.fillStyle    = "#fff";
        ctx.font         = `bold ${s * 0.55}px sans-serif`;
        ctx.textAlign    = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("C", 0, 1);
      }
      ctx.restore();
    };

    // ── Physics + render loop ────────────────────────────────────────────────
    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      // Body-body separation
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const a = bodies[i], b = bodies[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          const minDist = (a.size + b.size) / 2 + SEP_PADDING;
          if (dist < minDist && dist > 0) {
            const s = (1 - dist / minDist) * SEP_FORCE;
            const nx = dx / dist, ny = dy / dist;
            a.vx += nx * s; a.vy += ny * s;
            b.vx -= nx * s; b.vy -= ny * s;
          }
        }
      }

      for (const b of bodies) {
        // ── Alpha: interpolate toward proximity-based target ─────────────────
        const distToMouse = Math.hypot(b.x - mx, b.y - my);
        const targetAlpha = distToMouse < REVEAL_RADIUS
          ? MIN_ALPHA + (TARGET_ALPHA - MIN_ALPHA) * (1 - distToMouse / REVEAL_RADIUS)
          : MIN_ALPHA;
        b.alpha += (targetAlpha - b.alpha) * ALPHA_EASE;

        // ── Hover repulsion ──────────────────────────────────────────────────
        if (distToMouse < HOVER_RADIUS && distToMouse > 0) {
          const dx = b.x - mx, dy = b.y - my;
          const strength = (1 - distToMouse / HOVER_RADIUS) * HOVER_FORCE;
          b.vx += (dx / distToMouse) * strength;
          b.vy += (dy / distToMouse) * strength;
          b.rv += (dx / distToMouse) * strength * 0.04;
        }

        // ── Integrate ────────────────────────────────────────────────────────
        b.vy  += GRAVITY;
        b.x   += b.vx;
        b.y   += b.vy;
        b.rot += b.rv;
        b.vx  *= 0.995;

        const hr = b.size / 2;
        if (b.x - hr < 0)  { b.x = hr;     b.vx =  Math.abs(b.vx) * BOUNCE; b.rv *= -0.5; }
        if (b.x + hr > W)  { b.x = W - hr; b.vx = -Math.abs(b.vx) * BOUNCE; b.rv *= -0.5; }
        if (b.y - hr < 0)  { b.y = hr;     b.vy =  Math.abs(b.vy) * BOUNCE; }
        if (b.y + hr > H)  {
          b.y  = H - hr;
          b.vy = Math.abs(b.vy) < MIN_BOUNCE_V ? 0 : -b.vy * BOUNCE;
          b.vx *= FRICTION;
          b.rv *= ROT_FRICTION;
        }

        drawBody(b);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      persistedBodies = bodies;
      canvas.removeEventListener("mousemove",  onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchmove",  onTouchMove);
      canvas.removeEventListener("touchend",   onTouchEnd);
      window.removeEventListener("resize",     resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full ${className}`}
    />
  );
}
