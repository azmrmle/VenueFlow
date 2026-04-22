/**
 * Form field wrapper — renders a label, the child input, and an optional error message.
 */
export default function Field({ label, error, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: 13,
            fontWeight: 500,
            color: "var(--mid)",
            marginBottom: 6,
          }}
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <p style={{ color: "var(--err)", fontSize: 12, marginTop: 4 }}>{error}</p>
      )}
    </div>
  );
}
