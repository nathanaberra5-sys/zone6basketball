import React from "react";
import Button from "../ds/Button.jsx";
import { setCta } from "../lib/scroll.js";
import heroVideo from "../assets/hero-cinematic.mp4";
import heroPoster from "../assets/hero-cinematic-poster.png";

// Hero2 — full-bleed cinematic video with monumental type + scroll parallax.
const H2_LOOP_START = 0.15;
const H2_LOOP_END = 10.3;

function Z6Video({ style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const p = v.play(); if (p && p.catch) p.catch(() => {});
    const onT = () => { if (v.currentTime >= H2_LOOP_END || v.currentTime < H2_LOOP_START) v.currentTime = H2_LOOP_START; };
    v.addEventListener("timeupdate", onT);
    return () => v.removeEventListener("timeupdate", onT);
  }, []);
  return (
    <video ref={ref} src={heroVideo} poster={heroPoster} muted autoPlay loop playsInline preload="auto"
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 38%", display: "block", ...style }} />
  );
}

// drifting neon particles
function Stars2({ intensity = 1 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cv = ref.current;
    if (!cv || reduce || intensity === 0) return;
    const ctx = cv.getContext("2d");
    let raf, w, h, parts, running = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const N = Math.round(40 * intensity);
    const resize = () => { w = cv.clientWidth; h = cv.clientHeight; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const seed = () => { parts = Array.from({ length: N }, () => ({
      x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.5 + 0.4,
      vy: -(Math.random() * 0.3 + 0.06) * intensity, vx: (Math.random() - 0.5) * 0.12,
      a: Math.random() * 0.5 + 0.15, tw: Math.random() * Math.PI * 2 })); };
    resize(); seed();
    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y += p.vy; p.x += p.vx; p.tw += 0.04;
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(57,255,20," + (p.a * (0.6 + 0.4 * Math.sin(p.tw))) + ")";
        ctx.shadowColor = "rgba(57,255,20,0.9)"; ctx.shadowBlur = 6; ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { resize(); seed(); };
    window.addEventListener("resize", onResize);
    return () => { running = false; cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [intensity]);
  return <canvas ref={ref} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

export default function Hero2({ onNav, go, motion = "bold" }) {
  const typeRef = React.useRef(null);
  const intensity = motion === "bold" ? 1 : motion === "subtle" ? 0 : 0.55;

  // parallax — headline drifts slower than scroll (transform only)
  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || motion === "subtle") return;
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const y = Math.min(window.scrollY, 900);
        if (typeRef.current) typeRef.current.style.transform = "translateY(" + y * -0.14 + "px)";
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [motion]);

  return (
    <section id="top" className="z6-hero2">
      <div style={{ position: "absolute", inset: 0 }}><Z6Video /></div>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(5,5,5,0.62) 0%, rgba(5,5,5,0.18) 42%, rgba(5,5,5,0.97) 100%)" }}></div>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(70% 55% at 22% 84%, rgba(57,255,20,0.16), transparent 66%)" }}></div>
      <Stars2 intensity={intensity} />
      <div aria-hidden="true" className="z6-grain" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}></div>
      <div aria-hidden="true" className="z6-scan" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}></div>

      {/* mission metadata strip */}
      <div className={"z6-hero2-meta" + (go ? " run" : "")}>
        <span>SYDNEY&nbsp; 33.87°S&nbsp;151.21°E</span>
        <span className="z6-hide-mobile">SECTOR&nbsp;06</span>
        <span className="z6-hide-mobile">AGES&nbsp;6–19</span>
        <span className="z6-hide-mobile" style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
          <span className="z6-rec-dot"></span>ENROLLING&nbsp;NOW
        </span>
      </div>

      <div className="z6-hero2-inner" ref={typeRef}>
        <p className="z6-cond z6-hero2-kicker">School basketball program<br />Sydney based · NSW wide · Ages 6–19</p>
        <h1 className={"z6-display z6-hero2-h" + (go ? " run" : "")}>
          <span className="z6-h2line" style={{ ["--d"]: "0ms" }}><span className="z6-outline">OUT&nbsp;OF&nbsp;THIS</span></span>
          <span className="z6-h2line" style={{ ["--d"]: "110ms" }}><span style={{ color: "var(--z6-white)" }}>WORLD</span></span>
          <span className="z6-h2line" style={{ ["--d"]: "220ms" }}><span className="z6-h2green">SKILLS</span></span>
        </h1>
        <div className={"z6-hero2-foot" + (go ? " run" : "")}>
          <p className="z6-hero2-sub">
            <span className="z6-hero2-sub-lead">Professional basketball development in
            schools — Sydney based, NSW wide.</span>{" "}
            Led by NBL1 pro <strong className="z6-hero2-sub-name">Gum Majak</strong>.
            Skill, discipline and confidence — from the court to the stars.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Button size="lg" onClick={() => { setCta("Book a School Program (hero)"); onNav("register"); }}>Book a School Program</Button>
            <Button size="lg" variant="secondary" onClick={() => { setCta("See the Pathway (hero)"); onNav("programs"); }}>See the Pathway</Button>
          </div>
        </div>
      </div>

      <div className="z6-hero2-cue" aria-hidden="true"><span></span></div>
    </section>
  );
}
