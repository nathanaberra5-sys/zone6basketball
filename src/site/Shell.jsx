import React from "react";
import Wordmark from "./Wordmark.jsx";
import Button from "../ds/Button.jsx";
import { setCta } from "../lib/scroll.js";

// Shell — top navigation: inline section links on desktop, full-screen menu on mobile.
// A thin green scroll-progress line runs under the bar.
export const RAIL_SECTIONS = [
  { id: "experience", n: "01", label: "Experience" },
  { id: "programs",   n: "02", label: "Pathway" },
  { id: "founder",    n: "03", label: "Gum" },
  { id: "gallery",    n: "04", label: "Court" },
  { id: "launch",     n: "05", label: "Launch" },
  { id: "faq",        n: "06", label: "FAQ" },
  { id: "register",   n: "07", label: "Join" },
];

function useScrollProgress(ref) {
  React.useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        if (ref.current) ref.current.style.transform = "scaleX(" + p + ")";
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
}

function MenuOverlay({ open, onClose, onNav, active }) {
  React.useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  const go = (id) => { document.body.style.overflow = ""; onClose(); onNav(id); };
  return (
    <div className={"z6-menu" + (open ? " open" : "")} aria-hidden={!open}>
      <div className="z6-menu-head">
        <Wordmark height={26} onClick={() => go("top")} />
        <button className="z6-menu-x" onClick={onClose} aria-label="Close menu">✕</button>
      </div>
      <nav className="z6-menu-list">
        {RAIL_SECTIONS.map((s, i) => (
          <a key={s.id} className={"z6-menu-item" + (active === s.id ? " on" : "")}
            style={{ ["--i"]: i }} onClick={() => go(s.id)}>
            <span className="z6-cond z6-menu-n">{s.n}</span>
            <span className="z6-display z6-menu-label">{s.label}</span>
            <span className="z6-menu-arrow" aria-hidden="true">→</span>
          </a>
        ))}
      </nav>
      <div className="z6-menu-foot">
        <a href="tel:+61403416836" className="z6-cond" style={{ fontWeight: 600, letterSpacing: "0.12em", fontSize: 15, color: "var(--text-secondary)" }}>0403 416 836</a>
        <Button size="md" onClick={() => { setCta("Book a Spot (menu)"); go("register"); }}>Book a Spot</Button>
      </div>
    </div>
  );
}

export default function TopBar({ onNav, active }) {
  const [menu, setMenu] = React.useState(false);
  const barRef = React.useRef(null);
  useScrollProgress(barRef);
  return (
    <React.Fragment>
      <header className="z6-topbar">
        <Wordmark height={26} onClick={() => onNav("top")} />
        <nav className="z6-topnav" aria-label="Sections">
          {RAIL_SECTIONS.map((s) => (
            <a key={s.id} className={"z6-cond z6-topnav-link" + (active === s.id ? " on" : "")}
              onClick={() => onNav(s.id)}>{s.label}</a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Button size="sm" onClick={() => { setCta("Book a Spot (top bar)"); onNav("register"); }}>Book a Spot</Button>
          <button className="z6-burger" onClick={() => setMenu(true)} aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
        <div className="z6-progress" aria-hidden="true"><div ref={barRef}></div></div>
      </header>
      <MenuOverlay open={menu} onClose={() => setMenu(false)} onNav={onNav} active={active} />
    </React.Fragment>
  );
}
