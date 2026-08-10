import React from "react";

/**
 * Zone6 text input with caps label. Dark field, green focus glow.
 */
export default function Input({ label, hint, error, id, style = {}, wrapStyle = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `z6-${String(label).toLowerCase().replace(/\s+/g, "-")}` : undefined);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", ...wrapStyle }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--text-secondary)",
          }}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "15px",
          color: "var(--text-primary)",
          background: "var(--surface-sunk)",
          border: `1px solid ${error ? "var(--danger)" : focus ? "var(--accent)" : "var(--border-strong)"}`,
          borderRadius: "var(--radius-md)",
          padding: "12px 14px",
          outline: "none",
          boxShadow: focus ? "var(--glow-green-sm)" : "none",
          transition: "border var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
          ...style,
        }}
        {...rest}
      />
      {(hint || error) && (
        <span style={{ fontSize: "12px", color: error ? "var(--danger)" : "var(--text-muted)" }}>{error || hint}</span>
      )}
    </div>
  );
}
