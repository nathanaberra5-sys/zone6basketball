import React from "react";
import markTight from "../assets/z6-mark-tight.png";

// Wordmark — HTML/CSS Zone6 lockup (crisp, uses the display font).
export default function Wordmark({ height = 30, onClick, sub = true }) {
  const fs = height;
  return (
    <div onClick={onClick} style={{ display:"inline-flex", flexDirection:"column", lineHeight:0.9, cursor:onClick?"pointer":"default", userSelect:"none" }}>
      <span className="z6-display" style={{ fontSize:fs, letterSpacing:"0.04em", color:"var(--z6-white)", display:"inline-flex", alignItems:"center" }}>
        ZONE
        <img src={markTight} alt="6" style={{
          height:fs*1.24, width:"auto", marginLeft:fs*0.08, marginTop:fs*0.02, alignSelf:"center",
        }} />
      </span>
      {sub && (
        <span className="z6-cond" style={{
          fontSize:fs*0.28, fontWeight:700, letterSpacing:"0.42em", marginLeft:2,
          textTransform:"uppercase", color:"var(--text-secondary)",
        }}>Basketball</span>
      )}
    </div>
  );
}
