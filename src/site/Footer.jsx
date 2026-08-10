import React from "react";
import Wordmark from "./Wordmark.jsx";
import Button from "../ds/Button.jsx";
import { setCta } from "../lib/scroll.js";
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_TEL } from "../config.js";

// Footer — contact band + wordmark.
export default function Footer({ onNav }) {
  const Ig = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"></rect>
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
    </svg>
  );
  const Phone = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  );
  const Mail = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
      <path d="m22 7-10 6L2 7"></path>
    </svg>
  );
  const linkStyle = { display:"inline-flex", alignItems:"center", gap:8, color:"var(--text-secondary)", fontSize:"15px" };

  return (
    <footer style={{ borderTop:"1px solid var(--border-subtle)", background:"var(--bg-deep)", padding:"54px 32px 40px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between",
        gap:36, alignItems:"center", flexWrap:"wrap" }}>
        <div>
          <Wordmark height={34} />
          <p className="z6-cond" style={{ fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase",
            color:"var(--text-muted)", fontSize:"13px", marginTop:14 }}>From the court to the stars.</p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12, alignItems:"flex-start" }}>
          <a href={`tel:${PHONE_TEL}`} style={linkStyle}><Phone /> {PHONE_DISPLAY}</a>
          <a href={`mailto:${CONTACT_EMAIL}`} style={linkStyle}><Mail /> {CONTACT_EMAIL}</a>
          <a href="https://instagram.com/gummajak" target="_blank" rel="noopener" style={linkStyle}><Ig /> @GUMMAJAK</a>
          <span style={{ ...linkStyle, color:"var(--text-muted)" }}>Right across Sydney</span>
          <Button size="sm" onClick={() => { setCta("Book a Spot (footer)"); onNav("register"); }} style={{ marginTop:6 }}>Book a Spot</Button>
        </div>
      </div>
      <div style={{ maxWidth:1100, margin:"34px auto 0", paddingTop:22, borderTop:"1px solid var(--border-subtle)",
        color:"var(--text-muted)", fontSize:"13px" }}>
        © {new Date().getFullYear()} Zone6 Basketball · Built in the zone.
      </div>
    </footer>
  );
}
