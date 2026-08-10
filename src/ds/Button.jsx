import React from "react";

/**
 * Zone6 primary action button. Neon-green CTA with glow, plus secondary
 * (silver outline), ghost, and danger variants.
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  full = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  onClick,
  type = "button",
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { fontSize: "12px", padding: "8px 16px", letterSpacing: "0.1em" },
    md: { fontSize: "14px", padding: "12px 24px", letterSpacing: "0.1em" },
    lg: { fontSize: "16px", padding: "16px 34px", letterSpacing: "0.12em" },
  };
  const base = {
    fontFamily: "var(--font-condensed)",
    fontWeight: 700,
    textTransform: "uppercase",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    borderRadius: "var(--radius-pill)",
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    width: full ? "100%" : "auto",
    transition:
      "transform var(--dur-fast) var(--ease-pop), box-shadow var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)",
    ...sizes[size],
  };
  const variants = {
    primary: { background: "var(--accent)", color: "#0A0A0A", boxShadow: "var(--glow-green-md)" },
    secondary: { background: "transparent", color: "var(--text-primary)", borderColor: "var(--border-strong)" },
    ghost: { background: "transparent", color: "var(--text-accent)", borderColor: "transparent" },
    danger: { background: "var(--danger)", color: "#fff" },
  };
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const hoverStyle =
    !disabled && hover
      ? {
          primary: { background: "var(--accent-hover)", boxShadow: "var(--glow-green-lg)" },
          secondary: { borderColor: "var(--border-accent)", color: "var(--text-accent)" },
          ghost: { background: "var(--z6-green-08)" },
          danger: { filter: "brightness(1.08)" },
        }[variant]
      : {};
  const activeStyle = !disabled && active ? { transform: "scale(0.96)" } : {};
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{ ...base, ...variants[variant], ...hoverStyle, ...activeStyle, ...style }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
