import React from "react";

// SpaceField — ambient site-wide starfield. Fixed behind content (z-index:-1), so it only
// shows through the plain deep-black stretches and never sits on top of information.
export default function SpaceField({ enabled = true }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const cv = ref.current;
    if (!cv || !enabled) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = cv.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w, h, stars, raf, running = true, meteor = null, nextMeteor = performance.now() + 6000;
    const resize = () => { w = cv.clientWidth; h = cv.clientHeight; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const seed = () => {
      const N = Math.round(Math.min(w, 1600) / 16); // ~60–100 stars
      stars = Array.from({ length: N }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.1 + 0.35,
        a: Math.random() * 0.26 + 0.10,
        green: Math.random() < 0.18,
        tw: Math.random() * Math.PI * 2, ts: Math.random() * 0.015 + 0.004,
        vy: Math.random() * 0.02 + 0.004,
      }));
    };
    const paint = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        if (!reduce) { s.tw += s.ts; s.y += s.vy; if (s.y > h + 2) { s.y = -2; s.x = Math.random() * w; } }
        const a = s.a * (reduce ? 1 : 0.55 + 0.45 * Math.sin(s.tw));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.green ? "rgba(57,255,20," + a * 0.9 + ")" : "rgba(200,205,200," + a + ")";
        ctx.fill();
      }
      // rare shooting star — one thin streak, then quiet again
      if (!reduce) {
        if (!meteor && t > nextMeteor) {
          const fromLeft = Math.random() < 0.5;
          meteor = { x: fromLeft ? -40 : w * (0.3 + Math.random() * 0.6), y: Math.random() * h * 0.5,
            vx: (fromLeft ? 1 : 0.7) * (7 + Math.random() * 4), vy: 2.2 + Math.random() * 1.6, life: 1 };
        }
        if (meteor) {
          meteor.x += meteor.vx; meteor.y += meteor.vy; meteor.life -= 0.016;
          const g = ctx.createLinearGradient(meteor.x - meteor.vx * 9, meteor.y - meteor.vy * 9, meteor.x, meteor.y);
          g.addColorStop(0, "rgba(57,255,20,0)");
          g.addColorStop(1, "rgba(220,255,215," + 0.5 * Math.max(meteor.life, 0) + ")");
          ctx.strokeStyle = g; ctx.lineWidth = 1.4; ctx.lineCap = "round";
          ctx.beginPath(); ctx.moveTo(meteor.x - meteor.vx * 9, meteor.y - meteor.vy * 9); ctx.lineTo(meteor.x, meteor.y); ctx.stroke();
          if (meteor.life <= 0 || meteor.x > w + 60 || meteor.y > h + 60) { meteor = null; nextMeteor = t + 9000 + Math.random() * 10000; }
        }
      }
    };
    const loop = (t) => { if (!running) return; paint(t); if (!reduce) raf = requestAnimationFrame(loop); };
    resize(); seed(); raf = requestAnimationFrame(loop);
    const onResize = () => { resize(); seed(); if (reduce) paint(0); };
    window.addEventListener("resize", onResize);
    return () => { running = false; cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [enabled]);
  if (!enabled) return null;
  return <canvas ref={ref} aria-hidden="true" style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: -1, pointerEvents: "none" }} />;
}
