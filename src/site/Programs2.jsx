import React from "react";
import Badge from "../ds/Badge.jsx";
import Button from "../ds/Button.jsx";
import { setCta } from "../lib/scroll.js";

// Programs2 — "the pathway" depth chart. Full-width expandable rows instead of cards.
export default function Programs2({ onNav }) {
  const [open, setOpen] = React.useState(1);
  const programs = [
    { n: "01", tag: "Ages 6–9", name: "ROOKIES", line: "Where it begins.",
      words: ["Fundamentals", "Fun", "Confidence"],      desc: "First touches, coordination and listening. Beginners welcome — this is where the love for the game starts." },
    { n: "02", tag: "Ages 10–12", name: "RISERS", line: "Growth starts here.",
      words: ["Ball-handling", "Shooting", "Team play"], featured: true,
      desc: "Real skill work and game IQ in competitive, supportive scrimmages. The space between learning and competing." },
    { n: "03", tag: "Ages 13–19", name: "ELITE", line: "Take it further.",
      words: ["Pro drills", "Strength", "Game IQ"],      desc: "Pathway training with pro-level drills for players who are serious about levelling up their game." },
  ];
  return (
    <section id="programs" className="z6-sec">
      <div className="z6-kick"><span className="z6-kick-n">02</span><span>THE PATHWAY</span></div>
      <h2 className="z6-cond z6-sec-h">Three Levels. One Pathway.</h2>
      <div style={{ marginTop: 38 }}>
        {programs.map((p, i) => {
          const isOpen = open === i;
          const joinLabel = "Join " + p.name.charAt(0) + p.name.slice(1).toLowerCase();
          return (
            <div key={p.name} className={"z6-prow" + (isOpen ? " open" : "") + (p.featured ? " feat" : "")}>
              <button className="z6-prow-head" onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}>
                <span className="z6-cond z6-prow-n">{p.n}</span>
                <span className="z6-display z6-prow-name">{p.name}</span>
                <span className="z6-cond z6-prow-line z6-hide-mobile">{p.line}</span>
                <span className="z6-prow-right">
                  <Badge tone={p.featured ? "solid" : "neutral"}>{p.tag}</Badge>
                  <span className="z6-prow-plus" aria-hidden="true">+</span>
                </span>
              </button>
              <div className="z6-prow-body" style={{ maxHeight: isOpen ? 460 : 0 }}>
                <div className="z6-prow-bodyin">
                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
                    {p.words.map((w) => (
                      <span key={w} className="z6-cond" style={{ fontWeight: 700, fontSize: 12,
                        textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--text-accent)" }}>{w}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-secondary)", margin: "0 0 18px", maxWidth: 620 }}>{p.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
                    <Button size="sm" variant={p.featured ? "primary" : "secondary"}
                      onClick={() => { setCta(joinLabel + " (pathway)"); onNav("register"); }}>{joinLabel}</Button>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--text-muted)" }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--z6-green)", boxShadow: "var(--glow-green-sm)" }}></span>
                      Enrolling now
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
