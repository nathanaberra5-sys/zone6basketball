import React from "react";
import Button from "../ds/Button.jsx";
import { z6scroll, setCta } from "../lib/scroll.js";
import gumCoaching from "../assets/gum-coaching.jpg";
import coachHuddle from "../assets/coach-huddle.jpg";
import teamRedeyes from "../assets/team-redeyes.jpg";
import sideline from "../assets/sideline.jpg";
import reddamTeam from "../assets/reddam-team.jpg";

// Filmstrip — horizontal scroll-snap strip of court photos.
export default function Filmstrip() {
  const slots = [
    { id: "g1", src: gumCoaching, ph: "Coaching session", cap: "COACHING" },
    { id: "g2", src: coachHuddle, ph: "Talking it through", cap: "THE HUDDLE" },
    { id: "g3", src: teamRedeyes, ph: "The squad", cap: "THE SQUAD" },
    { id: "g4", src: sideline, ph: "Game day", cap: "GAME DAY" },
    { id: "g5", src: reddamTeam, ph: "Team photo", cap: "TEAM" },
  ];
  const ref = React.useRef(null);
  const nudge = (dir) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.7), behavior: "smooth" });
  };
  return (
    <section id="gallery" className="z6-sec" style={{ maxWidth: "none", paddingLeft: 0, paddingRight: 0 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20,
        flexWrap: "wrap", padding: "0 clamp(24px,5vw,72px)" }}>
        <div>
          <div className="z6-kick"><span className="z6-kick-n">04</span><span>FROM THE COURT</span></div>
          <h2 className="z6-cond z6-sec-h">Inside A Session</h2>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button className="z6-strip-btn" onClick={() => nudge(-1)} aria-label="Scroll photos left">←</button>
          <button className="z6-strip-btn" onClick={() => nudge(1)} aria-label="Scroll photos right">→</button>
        </div>
      </div>
      <div className="z6-strip" ref={ref}>
        {slots.map((s, i) => (
          <figure key={s.id} className={"z6-frame" + (i % 2 ? " lo" : "")}>
            <img src={s.src} alt={s.ph} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            <figcaption className="z6-cond">
              <span style={{ color: "var(--z6-green)" }}>0{i + 1}</span>&nbsp; {s.cap}
            </figcaption>
          </figure>
        ))}
        <div className="z6-frame z6-frame-cta">
          <div>
            <p className="z6-cond">YOUR KID<br />BELONGS<br />IN FRAME.</p>
            <Button size="sm" variant="secondary" onClick={() => { setCta("Join a Session (filmstrip)"); z6scroll("register"); }}>Join a Session</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
