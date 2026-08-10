import React from "react";

/**
 * Zone6 badge / tag — small all-caps label. Green (accent), silver (neutral),
 * outline, and semantic tones.
 */
export default function Badge({ children, tone = "accent", glow = false, style = {}, ...rest }) {
  const tones = {
    accent: {
      background: "var(--z6-green-15)",
      color: "var(--z6-green)",
      border: "1px solid var(--border-accent)",
    },
    neutral: {
      background: "var(--z6-silver-15)",
      color: "var(--text-secondary)",
      border: "1px solid var(--border-subtle)",
    },
    solid: {
      background: "var(--accent)",
      color: "#0A0A0A",
      border: "1px solid transparent",
    },
    danger: {
      background: "rgba(255,68,56,0.15)",
      color: "var(--danger)",
      border: "1px solid rgba(255,68,56,0.4)",
    },
    warning: {
      background: "rgba(255,196,0,0.15)",
      color: "var(--warning)",
      border: "1px solid rgba(255,196,0,0.4)",
    },
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "var(--font-body)",
        fontWeight: 700,
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        padding: "4px 10px",
        borderRadius: "var(--radius-pill)",
        boxShadow: glow ? "var(--glow-green-sm)" : "none",
        ...tones[tone],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
