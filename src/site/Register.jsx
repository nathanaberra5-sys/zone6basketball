import React from "react";
import Badge from "../ds/Badge.jsx";
import Card from "../ds/Card.jsx";
import Button from "../ds/Button.jsx";
import Input from "../ds/Input.jsx";
import { getCta } from "../lib/scroll.js";
import { CONTACT_EMAIL, FORM_ENDPOINT, FORM_ACCESS_KEY, PHONE_DISPLAY, PHONE_TEL } from "../config.js";

// Register — enquiry form. Toggle between player sign-up and school booking.
// Submissions are relayed to CONTACT_EMAIL with reply-to set to the enquirer,
// a subject that names the mode, and the CTA the visitor came from.
export default function Register() {
  const [mode, setMode] = React.useState("player"); // player | school
  const [status, setStatus] = React.useState("idle"); // idle | sending | done | error

  const Seg = ({ id, label }) => (
    <button onClick={() => setMode(id)} className="z6-cond" style={{
      flex:1, padding:"10px 12px", cursor:"pointer", textTransform:"uppercase",
      letterSpacing:"0.08em", fontWeight:700, fontSize:"13px", borderRadius:"var(--radius-pill)",
      border:"1px solid " + (mode===id ? "transparent" : "var(--border-strong)"),
      background: mode===id ? "var(--accent)" : "transparent",
      color: mode===id ? "#0A0A0A" : "var(--text-secondary)",
      boxShadow: mode===id ? "var(--glow-green-sm)" : "none",
      transition:"all var(--dur-base) var(--ease-out)",
    }}>{label}</button>
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("botcheck")) { setStatus("done"); return; } // honeypot tripped — show success, send nothing
    const isPlayer = mode === "player";
    const name = isPlayer ? data.get("Player Name") : data.get("School Name");
    const payload = {
      access_key: FORM_ACCESS_KEY,
      subject: `Zone6 enquiry — ${isPlayer ? "Player/Parent" : "School"} — ${name}`,
      from_name: "Zone6 Basketball website",
      replyto: isPlayer ? data.get("Parent Email") : data.get("Email"),
      "Enquiry type": isPlayer ? "Player / Parent" : "School",
      "Came from": getCta(),
    };
    for (const [k, v] of data.entries()) if (k !== "botcheck" && v) payload[k] = v;
    if (!FORM_ACCESS_KEY) { setStatus("error"); return; }
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const out = await res.json().catch(() => ({}));
      setStatus(res.ok && out.success ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="register" style={{ padding:"76px 32px", maxWidth:720, margin:"0 auto", scrollMarginTop:"72px" }}>
      <div style={{ textAlign:"center", marginBottom:30 }}>
        <Badge tone="accent" glow style={{ marginBottom:14 }}>Next Generation. Starting Now.</Badge>
        <h2 className="z6-cond" style={{ fontWeight:800, textTransform:"uppercase", letterSpacing:"0.04em",
          fontSize:"clamp(32px,4.6vw,44px)", margin:0, color:"var(--z6-white)" }}>Get In The Zone</h2>
      </div>
      <Card padding="30px">
        {status === "done" ? (
          <div style={{ textAlign:"center", padding:"28px 10px" }}>
            <div className="z6-display" style={{ fontSize:56, color:"var(--z6-green)", textShadow:"var(--glow-text-green)" }}>YOU'RE IN</div>
            <p style={{ color:"var(--text-secondary)" }}>Gum will be in touch with the next steps. Welcome to the Zone.</p>
          </div>
        ) : (
          <React.Fragment>
            <div style={{ display:"flex", gap:10, marginBottom:22 }}>
              <Seg id="player" label="Player / Parent" />
              <Seg id="school" label="School" />
            </div>
            <form onSubmit={onSubmit} style={{ display:"flex", flexDirection:"column", gap:18 }}>
              {mode === "player" ? (
                <React.Fragment>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:18 }}>
                    <Input label="Player Name" name="Player Name" placeholder="e.g. Jordan" required />
                    <Input label="Age" name="Age" type="number" min={6} max={19} placeholder="6–19" required />
                  </div>
                  <Input label="Parent Email" name="Parent Email" type="email" placeholder="you@email.com" hint="Session details go here" required />
                  <Input label="School / Suburb" name="School / Suburb" placeholder="Which school or suburb?" />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:18 }}>
                    <Input label="School Name" name="School Name" placeholder="Your school" required />
                    <Input label="Contact Name" name="Contact Name" placeholder="Who's enquiring?" required />
                  </div>
                  <Input label="Email" name="Email" type="email" placeholder="you@school.nsw.edu.au" required />
                  <Input label="What are you after?" name="What are you after?" placeholder="Weekly program, incursion, camp…" />
                </React.Fragment>
              )}
              <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true"
                style={{ display:"none" }} />
              {status === "error" && (
                <div role="alert" style={{ border:"1px solid rgba(255,68,56,0.4)", background:"rgba(255,68,56,0.08)",
                  borderRadius:"var(--radius-md)", padding:"14px 16px", fontSize:"14px", lineHeight:1.55,
                  color:"var(--text-secondary)" }}>
                  <strong style={{ color:"var(--danger)" }}>Your enquiry didn't send.</strong>{" "}
                  Please email Gum directly at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} style={{ color:"var(--z6-green)" }}>{CONTACT_EMAIL}</a>{" "}
                  or call <a href={`tel:${PHONE_TEL}`} style={{ color:"var(--z6-green)" }}>{PHONE_DISPLAY}</a>.
                </div>
              )}
              <Button type="submit" size="lg" full disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : mode === "player" ? "Join a Session" : "Book a School Program"}
              </Button>
              <p style={{ textAlign:"center", color:"var(--text-muted)", fontSize:"12px", lineHeight:1.6, margin:0 }}>
                The details you enter go straight to {CONTACT_EMAIL} so Gum can get back to you.
                They aren't stored on this site or shared with anyone else.
              </p>
            </form>
          </React.Fragment>
        )}
      </Card>
      <p style={{ textAlign:"center", color:"var(--text-muted)", fontSize:"14px", marginTop:18 }}>
        Prefer to talk? Call Gum on <a href={`tel:${PHONE_TEL}`} style={{ color:"var(--text-accent)" }}>{PHONE_DISPLAY}</a>.
      </p>
    </section>
  );
}
