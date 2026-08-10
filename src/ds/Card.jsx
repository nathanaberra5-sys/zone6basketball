import React from "react";

/**
 * Zone6 surface card — charcoal panel with deep shadow. Optional accent
 * (green border + glow) and interactive hover-lift.
 */
export default function Card({ children, accent = false, interactive = false, padding = "24px", style = {}, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        background: "var(--surface-card)",
        border: accent ? "var(--card-border-accent)" : "var(--card-border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: hover ? "var(--shadow-lg), var(--glow-green-sm)" : "var(--shadow-md)",
        padding,
        transform: hover ? "translateY(-4px)" : "none",
        transition: "transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
        cursor: interactive ? "pointer" : "default",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
