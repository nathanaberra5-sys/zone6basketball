import React from "react";
import Button from "../ds/Button.jsx";
import LoopVideo from "./LoopVideo.jsx";
import { z6scroll, setCta } from "../lib/scroll.js";
import launchSpace from "../assets/launch-space.mp4";
import launchSpacePoster from "../assets/launch-space-poster.jpg";

// Launch — full-bleed campaign band: the Zone6 universe rendered literally.
// Higgsfield ambient loop (arena dissolving into space) as the backdrop,
// full-bleed cover like the still it replaced so it sizes to any viewport.
export default function Launch() {
  return (
    <section id="launch" style={{ position: "relative", overflow: "hidden", minHeight: "min(88vh, 860px)", display: "flex", alignItems: "flex-end", scrollMarginTop: 76 }}>
      <LoopVideo src={launchSpace} poster={launchSpacePoster} preload="metadata"
        aria-label="Basketball arena dissolving into deep space"
        style={{ position: "absolute", inset: 0, objectPosition: "50% 42%" }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.12) 34%, rgba(5,5,5,0.3) 62%, rgba(5,5,5,0.94) 100%)" }}></div>
      <div aria-hidden="true" className="z6-scan" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}></div>
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 1320, margin: "0 auto", padding: "clamp(90px,14vh,160px) clamp(24px,5vw,72px) clamp(56px,8vh,88px)" }}>
        <div className="z6-kick"><span className="z6-kick-n">05</span><span>FROM THE COURT TO THE STARS</span></div>
        <h2 className="z6-display" style={{ margin: "0 0 22px", lineHeight: 0.86, letterSpacing: "0.015em", fontSize: "clamp(52px,9vw,140px)" }}>
          <span className="z6-outline" style={{ display: "block" }}>NEXT GENERATION.</span>
          <span className="z6-h2green" style={{ display: "block" }}>STARTING NOW.</span>
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
          <Button size="lg" onClick={() => { setCta("Book a Spot (launch banner)"); z6scroll("register"); }}>Book a Spot</Button>
          <p style={{ margin: 0, maxWidth: 430, fontSize: 16, lineHeight: 1.55, color: "var(--text-secondary)" }}>
            Every session takes your game somewhere it hasn't been. Welcome to the Zone.
          </p>
        </div>
      </div>
    </section>
  );
}
