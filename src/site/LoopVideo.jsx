import React from "react";

// LoopVideo — background video that must never stop.
// The clips are pre-cut as seamless loops, so native `loop` handles the wrap;
// the listeners handle browsers that pause muted autoplay (tab switches,
// iOS Low Power Mode, battery savers) and never restart it on their own.
export default function LoopVideo({ src, poster, style, ...rest }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const tryPlay = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    const onPause = () => { if (!document.hidden && !v.ended) tryPlay(); };
    const onVis = () => { if (!document.hidden) tryPlay(); };
    const onGesture = () => { if (v.paused) tryPlay(); };
    tryPlay();
    v.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pointerdown", onGesture, { passive: true });
    window.addEventListener("touchstart", onGesture, { passive: true });
    return () => {
      v.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
    };
  }, []);
  return (
    <video ref={ref} src={src} poster={poster} muted autoPlay loop playsInline
      preload="auto" disablePictureInPicture {...rest}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...style }} />
  );
}
