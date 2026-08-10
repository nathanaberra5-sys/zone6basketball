import React from "react";
import Badge from "../ds/Badge.jsx";

// FAQ — Brodie-style accordion. Big questions, expand/collapse with a +/− toggle.
function FAQItem({ q, a, open, onToggle }) {
  return (
    <div style={{ borderBottom:"1px solid var(--border-subtle)" }}>
      <button onClick={onToggle} style={{
        width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", gap:20,
        background:"none", border:"none", cursor:"pointer", textAlign:"left", padding:"24px 4px",
      }}>
        <span className="z6-cond" style={{ fontWeight:700, textTransform:"uppercase", letterSpacing:"0.02em",
          fontSize:"clamp(18px,2.4vw,24px)", color: open ? "var(--z6-green)" : "var(--z6-white)",
          textShadow: open ? "var(--glow-text-green)" : "none", transition:"color var(--dur-base) var(--ease-out)" }}>{q}</span>
        <span style={{ flexShrink:0, width:30, height:30, display:"grid", placeItems:"center", borderRadius:"50%",
          border:"1px solid var(--border-accent)", color:"var(--z6-green)", fontSize:"20px", lineHeight:1,
          transform: open ? "rotate(45deg)" : "none", transition:"transform var(--dur-base) var(--ease-pop)" }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 320 : 0, overflow:"hidden", transition:"max-height var(--dur-slow) var(--ease-out)" }}>
        <p style={{ fontSize:"16px", lineHeight:1.62, color:"var(--text-secondary)", margin:"0 4px 24px", maxWidth:760 }}>{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = React.useState(0);
  const faqs = [
    { q:"Can my child join if they've never played?", a:"Absolutely. Our Rookies program (ages 6–9) is built for first-timers — we start with the fundamentals, keep it fun, and build confidence from the very first whistle. Beginners are always welcome." },
    { q:"What ages do you coach?", a:"Zone6 is for young players aged 6 to 19, split across three levels: Rookies (6–9), Risers (10–12) and Elite (13–19), so every kid trains with players at their stage." },
    { q:"Where are sessions held?", a:"We run programs in schools and gyms right across Sydney, and we're adding new venues every term. Get in touch and we'll point you to the closest session — or bring Zone6 to your school." },
    { q:"How do school programs work?", a:"We bring the whole program into your school — coaching, equipment and structure included. Curriculum-friendly and fully run by our team. Tap “Book a School Program” and we'll be in touch." },
  ];
  return (
    <section id="faq" style={{ padding:"80px 32px", maxWidth:920, margin:"0 auto", scrollMarginTop:"80px" }}>
      <div style={{ marginBottom:24 }}>
        <Badge tone="neutral" style={{ marginBottom:16 }}>Good To Know</Badge>
        <h2 className="z6-cond" style={{ fontWeight:800, textTransform:"uppercase", letterSpacing:"0.02em",
          fontSize:"clamp(32px,5vw,52px)", lineHeight:1.02, margin:0, color:"var(--z6-white)" }}>Questions, Answered</h2>
      </div>
      <div>
        {faqs.map((f, i) => (
          <FAQItem key={i} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </div>
    </section>
  );
}
