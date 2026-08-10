import React from "react";
import Stat from "../ds/Stat.jsx";

// Marquee — scrolling on-brand phrase band + stat strip.
export default function Marquee() {
  const phrases = ["OUT OF THIS WORLD SKILLS", "LEVEL UP", "FROM THE COURT TO THE STARS", "BUILT IN THE ZONE", "NEXT GENERATION. STARTING NOW."];
  const row = [...phrases, ...phrases];
  return (
    <section style={{ borderTop:"1px solid var(--border-subtle)", borderBottom:"1px solid var(--border-subtle)", background:"var(--surface-sunk)" }}>
      <div style={{ overflow:"hidden", whiteSpace:"nowrap", padding:"14px 0" }}>
        <div style={{ display:"inline-block", animation:"z6marq 28s linear infinite" }}>
          {row.map((p, i) => (
            <span key={i} className="z6-cond" style={{
              fontWeight:800, textTransform:"uppercase", letterSpacing:"0.12em", fontSize:"18px",
              color:"var(--text-secondary)", margin:"0 22px",
            }}>{p}<span style={{ color:"var(--z6-green)", margin:"0 0 0 22px" }}>✦</span></span>
          ))}
        </div>
      </div>
      <div style={{ display:"flex", gap:"clamp(24px,6vw,72px)", justifyContent:"center", flexWrap:"wrap",
        padding:"30px 32px", borderTop:"1px solid var(--border-subtle)" }}>
        <Stat value={`6'9"`} label="Pro Founder" sublabel="Gum Majak" align="center" />
        <Stat value="NBL1" label="East · Hills Hornets" align="center" />
        <Stat value="3" label="Program Levels" sublabel="Rookies · Risers · Elite" align="center" />
        <Stat value="6–19" label="Ages Welcome" align="center" />
      </div>
      <style>{`@keyframes z6marq { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce){ [style*="z6marq"]{ animation:none !important; } }`}</style>
    </section>
  );
}
