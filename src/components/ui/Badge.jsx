/** Coloured status badge for booking statuses: pending / confirmed / cancelled. */
export default function Badge({ status }) {
  const map = {
    pending:   ["#fff3cd", "#856404"],
    confirmed: ["#d1f0e4", "#1e7e5e"],
    cancelled: ["#fde8e8", "#c0392b"],
  };
  const [bg, col] = map[status] || map.pending;
  return (
    <span
      style={{
        background: bg,
        color: col,
        padding: "2px 10px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        textTransform: "capitalize",
      }}
    >
      {status}
    </span>
  );
}
