import React from "react";
import markTight from "../assets/z6-mark-tight.png";

// LaunchSequence — cinematic logo intro overlay (~2.6s, click to skip).
// Auto-removes on a hard timeout so the site can never get stuck behind it.
export default function Intro({ onDone, enabled = true }) {
  const [phase, setPhase] = React.useState("run"); // run → exit → gone
  const doneRef = React.useRef(false);

  const onDoneRef = React.useRef(onDone);
  onDoneRef.current = onDone;
  const finish = React.useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setPhase("gone");
    onDoneRef.current && onDoneRef.current();
  }, []);

  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (doneRef.current || !enabled || reduce) { finish(); return; }
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => { if (!doneRef.current) setPhase("exit"); }, 2080);
    const t2 = setTimeout(finish, 2800);
    // scrolling skips the intro — never trap the user
    const onScrollIntent = () => { setPhase("exit"); document.body.style.overflow = ""; setTimeout(finish, 300); };
    window.addEventListener("wheel", onScrollIntent, { passive: true, once: true });
    window.addEventListener("touchmove", onScrollIntent, { passive: true, once: true });
    window.addEventListener("keydown", onScrollIntent, { once: true });
    return () => {
      clearTimeout(t1); clearTimeout(t2); document.body.style.overflow = "";
      window.removeEventListener("wheel", onScrollIntent);
      window.removeEventListener("touchmove", onScrollIntent);
      window.removeEventListener("keydown", onScrollIntent);
    };
  }, [enabled, finish]);

  React.useEffect(() => {
    if (phase === "gone") document.body.style.overflow = "";
  }, [phase]);

  if (phase === "gone") return null;

  const skip = () => { setPhase("exit"); setTimeout(finish, 300); };

  return (
    <div className={"z6i" + (phase === "exit" ? " exit" : "")} onClick={skip}
      role="presentation" aria-hidden="true">
      <div className="z6i-panel z6i-pt"></div>
      <div className="z6i-panel z6i-pb"></div>
      <div className="z6i-line"></div>
      <div className="z6i-flash"></div>
      <div className="z6i-core">
        <div className="z6i-lock">
          <span className="z6i-word">
            {["Z","O","N","E"].map((c, i) => (
              <span key={i} className="z6i-letter" style={{ ["--i"]: i }}>{c}</span>
            ))}
          </span>
          <span className="z6i-markwrap">
            <span className="z6i-ring"></span>
            <span className="z6i-ring z6i-ring2"></span>
            <img className="z6i-mark" src={markTight} alt="" />
          </span>
        </div>
        <div className="z6i-sub">BASKETBALL &nbsp;·&nbsp; SYDNEY</div>
        <div className="z6i-tag">FROM THE COURT TO THE STARS</div>
      </div>
      <div className="z6i-skip">TAP TO SKIP</div>
    </div>
  );
}
