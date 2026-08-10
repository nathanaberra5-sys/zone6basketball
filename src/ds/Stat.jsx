import React from "react";

/**
 * Zone6 big stat — large display number with neon glow over a caps label.
 * For program metrics (players coached, schools, sessions).
 */
export default function Stat({ value, label, sublabel = null, align = "left", style = {}, ...rest }) {
  return (
    <div style={{ textAlign: align, ...style }} {...rest}>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--fs-display-md)",
          lineHeight: 0.9,
          color: "var(--z6-green)",
          textShadow: "var(--glow-text-green)",
          letterSpacing: "var(--ls-display)",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "var(--font-condensed)",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "var(--ls-caps)",
          color: "var(--text-primary)",
          fontSize: "15px",
          marginTop: "6px",
        }}
      >
        {label}
      </div>
      {sublabel && (
        <div style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)", fontSize: "13px", marginTop: "2px" }}>
          {sublabel}
        </div>
      )}
    </div>
  );
}
