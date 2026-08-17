import React from "react";
import Badge from "../ds/Badge.jsx";
import Card from "../ds/Card.jsx";
import Button from "../ds/Button.jsx";
import { setCta } from "../lib/scroll.js";
import cardSchools from "../assets/card-schools.jpg";
import cardPlayers from "../assets/card-players.jpg";
import cardHolidays from "../assets/card-holidays.jpg";

// Schedule — how it works + where we play. Two paths: school programs and open sessions.
// Each card leads with bespoke Zone6-universe artwork fading into the card surface.
export default function Schedule({ onNav }) {
  const cards = [
    { tag:"For Schools", emoji:"🏫", img:cardSchools, pos:"50% 50%", title:"School Programs", body:"Weekly coaching inside your school — curriculum-aligned, all equipment supplied.", cta:"Book a School Program", to:"register" },
    { tag:"For Players", emoji:"🏀", img:cardPlayers, pos:"50% 50%", title:"Open Sessions", body:"Weekend and after-school sessions — drop into your age group and train with pros.", cta:"Join a Session", to:"register" },
    { tag:"School Holidays", emoji:"☀️", img:cardHolidays, pos:"50% 45%", title:"Holiday Camps", body:"Full-day holiday camps — skills, games and guest pros. Spots are limited.", cta:"Reserve a Spot", to:"register" },
  ];
  return (
    <section id="schedule" style={{ padding:"76px 32px", scrollMarginTop:"80px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:44 }}>
          <Badge tone="accent" glow style={{ marginBottom:14 }}>How To Get In</Badge>
          <h2 className="z6-cond" style={{ fontWeight:800, textTransform:"uppercase", letterSpacing:"0.04em",
            fontSize:"clamp(34px,5vw,48px)", margin:"0 0 10px", color:"var(--z6-white)" }}>Two Ways To Play</h2>
          <p style={{ color:"var(--text-secondary)", fontSize:"16px", margin:0 }}>Running programs in schools right across Sydney.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px,1fr))", gap:24 }}>
          {cards.map((c) => (
            <Card key={c.title} interactive padding="0" style={{ display:"flex", flexDirection:"column", overflow:"hidden" }}>
              <div style={{ position:"relative", height:172, flex:"none" }}>
                <img src={c.img} alt="" aria-hidden="true" style={{ position:"absolute", inset:0, width:"100%", height:"100%",
                  objectFit:"cover", objectPosition:c.pos }} />
                <div aria-hidden="true" style={{ position:"absolute", inset:0,
                  background:"linear-gradient(180deg, rgba(26,26,26,0.05) 35%, rgba(26,26,26,0.55) 75%, var(--surface-card) 100%)" }}></div>
                <Badge tone="neutral" style={{ position:"absolute", left:18, bottom:12,
                  background:"rgba(10,10,10,0.72)", border:"1px solid var(--border-strong)" }}>
                  <span aria-hidden="true">{c.emoji}</span> {c.tag}
                </Badge>
              </div>
              <div style={{ padding:"18px 28px 28px", display:"flex", flexDirection:"column", flex:1 }}>
                <h3 className="z6-cond" style={{ fontWeight:800, textTransform:"uppercase", letterSpacing:"0.03em",
                  fontSize:"24px", margin:"0 0 12px", color:"var(--z6-white)" }}>{c.title}</h3>
                <p style={{ fontSize:"15px", lineHeight:1.55, color:"var(--text-secondary)", margin:"0 0 22px", flex:1 }}>{c.body}</p>
                <Button size="md" variant="secondary" onClick={() => { setCta(`${c.cta} (how to get in)`); onNav(c.to); }}>{c.cta}</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
