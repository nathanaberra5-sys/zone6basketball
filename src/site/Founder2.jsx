import React from "react";
import Badge from "../ds/Badge.jsx";
import reddamTeam from "../assets/reddam-team.jpg";

// Founder2 — Gum Majak band with monumental jersey number backdrop + pull quote.
export default function Founder2() {
  return (
    <section id="founder" className="z6-sec z6-founder2">
      {/* images/hf/nebula.jpg goes here (full-bleed, opacity 0.5) once generated via Higgsfield */}
      <span className="z6-display z6-founder2-num" aria-hidden="true">14</span>
      <div className="z6-founder2-grid">
        <div className="z6-founder2-photo">
          <div className="z6-founder2-accent" aria-hidden="true"></div>
          <img src={reddamTeam} alt="Gum Majak — Zone6 founder"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <div className="z6-kick"><span className="z6-kick-n">03</span><span>THE FOUNDER</span></div>
          <h2 className="z6-cond z6-sec-h">Coached By A Pro.</h2>
          <blockquote className="z6-cond z6-founder2-quote">
            “I coach like a big brother, not a teacher.”
          </blockquote>
          <p style={{ fontSize: 17, lineHeight: 1.62, color: "var(--text-secondary)", margin: "0 0 16px", maxWidth: 560 }}>
            Zone6 was founded by <strong style={{ color: "var(--text-primary)" }}>Gum Majak</strong> — a 6'9" forward
            playing NBL1 East for the Hills Hornets. A CIF champion out of Crean Lutheran High in California, Gum played
            college ball at Grayson College (Texas) and Walters State (Tennessee), developed his game in tournaments
            across China and Malaysia, and has trained with the Sydney Kings.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.62, color: "var(--text-secondary)", margin: "0 0 26px", maxWidth: 560 }}>
            He started Zone6 to give Sydney kids the coaching he wished he'd had growing up — high energy, real talk,
            and a genuine love for the game that kids feel from the first whistle.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Badge tone="solid">Hills Hornets · NBL1 East</Badge>
            <Badge tone="neutral">CIF Champion</Badge>
            <Badge tone="neutral">Trained w/ Sydney Kings</Badge>
            <Badge tone="neutral">6'9" Forward</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
