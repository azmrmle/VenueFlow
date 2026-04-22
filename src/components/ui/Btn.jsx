/**
 * Themed button component.
 *
 * @param {string}   variant  - "primary" | "gold" | "outline" | "ghost" | "danger" | "success"
 * @param {string}   size     - "sm" | "md" | "lg"
 * @param {boolean}  disabled
 * @param {object}   style    - Extra inline styles merged on top of variant
 */
export default function Btn({ children, onClick, variant = "primary", disabled, style = {}, size = "md" }) {
  const base = {
    border: "none",
    borderRadius: 4,
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    transition: "all .2s",
    opacity: disabled ? 0.5 : 1,
    padding:   size === "sm" ? "6px 14px"  : size === "lg" ? "14px 36px" : "10px 24px",
    fontSize:  size === "sm" ? 13          : size === "lg" ? 16          : 14,
  };

  const variants = {
    primary:  { background: "var(--teal)",    color: "#fff" },
    gold:     { background: "var(--gold)",    color: "var(--dark)" },
    outline:  { background: "transparent",   color: "var(--teal)",    border: "1.5px solid var(--teal)" },
    ghost:    { background: "transparent",   color: "var(--mid)",     border: "1.5px solid #ccc" },
    danger:   { background: "var(--err)",    color: "#fff" },
    success:  { background: "var(--success)", color: "#fff" },
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {children}
    </button>
  );
}
