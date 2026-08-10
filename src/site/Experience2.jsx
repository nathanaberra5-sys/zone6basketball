import React from "react";
import coachHuddle from "../assets/coach-huddle.jpg";
import gumCoaching from "../assets/gum-coaching.jpg";
import teamRedeyes from "../assets/team-redeyes.jpg";
import sideline from "../assets/sideline.jpg";

// Experience2 — asymmetric editorial mosaic with oversized index numbers.
function XTile({ n, img, title, desc, area }) {
  return (
    <div className="z6-xtile" style={{ gridArea: area }}>
      <img src={img} alt={title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover", objectPosition: "50% 30%" }} />
      <div style={{ position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(10,10,10,0.10) 30%, rgba(10,10,10,0.55) 62%, rgba(10,10,10,0.95) 100%)" }}></div>
      <span className="z6-display z6-xtile-n" aria-hidden="true">{n}</span>
      <div className="z6-xtile-copy">
        <h3 className="z6-cond">{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
}

export default function Experience2() {
  return (
    <section id="experience" className="z6-sec">
      <div className="z6-kick"><span className="z6-kick-n">01</span><span>THE ZONE6 EXPERIENCE</span></div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <h2 className="z6-cond z6-sec-h" style={{ maxWidth: 640 }}>More Than A Session. A Whole Program.</h2>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--text-secondary)", maxWidth: 380, margin: 0 }}>
          Real coaching, real games and real progress — wrapped in a program kids actually want to show up for.
        </p>
      </div>
      <div className="z6-xgrid">
        <XTile area="a" n="01" img={coachHuddle} title="Pro Coaching"
          desc="Led on the floor by NBL1 pro Gum Majak — high energy, real talk, pro habits from day one." />
        <XTile area="b" n="02" img={gumCoaching} title="School Programs"
          desc="We bring the whole program into your school." />
        <XTile area="c" n="03" img={teamRedeyes} title="Holiday Camps"
          desc="Full-day camps across the school holidays." />
        <XTile area="d" n="04" img={sideline} title="Real Game Time"
          desc="Competitive, supportive games every week." />
        <div className="z6-xmanifesto" style={{ gridArea: "e" }}>
          {/* images/hf/ball-planet.jpg goes here (opacity 0.55, cover) once generated via Higgsfield */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,10,10,0.2), rgba(10,10,10,0.88))" }}></div>
          <p className="z6-cond" style={{ position: "relative" }}>SKILLS ARE BUILT.<br />
            <span>CONFIDENCE IS EARNED.</span><br />
            BOTH HAPPEN HERE.</p>
          <span className="z6-display z6-xtile-n" style={{ right: 18, left: "auto" }} aria-hidden="true">05</span>
        </div>
      </div>
    </section>
  );
}
