import React from "react";
import Intro from "./site/Intro.jsx";
import SpaceField from "./site/Space.jsx";
import TopBar, { RAIL_SECTIONS } from "./site/Shell.jsx";
import Hero2 from "./site/Hero2.jsx";
import Marquee from "./site/Marquee.jsx";
import Experience2 from "./site/Experience2.jsx";
import Programs2 from "./site/Programs2.jsx";
import Schedule from "./site/Schedule.jsx";
import Founder2 from "./site/Founder2.jsx";
import Filmstrip from "./site/Filmstrip.jsx";
import Launch from "./site/Launch.jsx";
import FAQ from "./site/FAQ.jsx";
import Register from "./site/Register.jsx";
import Footer from "./site/Footer.jsx";
import { z6scroll } from "./lib/scroll.js";

// Shipped defaults (baked in from the design handoff's tweaks panel):
// intro ON, motion "bold", glow "bold", space dust ON.
export default function App() {
  const [go, setGo] = React.useState(false);
  const [active, setActive] = React.useState("experience");

  const onNav = (id) => { setActive(id); z6scroll(id); };

  // active-section tracking for the nav
  React.useEffect(() => {
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-38% 0px -55% 0px" });
    RAIL_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // scroll reveal on sections after the hero (transform only)
  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const secs = Array.from(document.querySelectorAll(".z6-main > section")).slice(1);
    if (reduce) return;
    secs.forEach((s) => s.classList.add("z6r"));
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <Intro enabled onDone={() => setGo(true)} />
      <SpaceField enabled />
      <div className="z6-main">
        <TopBar onNav={onNav} active={active} />
        <Hero2 onNav={onNav} go={go} motion="bold" />
        <Marquee />
        <Experience2 />
        <Programs2 onNav={onNav} />
        <Schedule onNav={onNav} />
        <Founder2 />
        <Filmstrip />
        <Launch />
        <FAQ />
        <Register />
        <Footer onNav={onNav} />
      </div>
    </div>
  );
}
