export default function AboutPage() {
  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "72px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <p style={{ color: "var(--gold)", letterSpacing: 3, fontSize: 12, textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>
          About VenueFlow
        </p>
        <h2 style={{ fontSize: "clamp(32px,5vw,54px)", fontWeight: 300, fontStyle: "italic", marginBottom: 16 }}>
          Crafting Memorable Events<br />Since 2010
        </h2>
        <p style={{ color: "var(--mid)", fontSize: 17, lineHeight: 1.8, maxWidth: 640, margin: "0 auto" }}>
          VenueFlow manages a curated portfolio of exceptional event spaces — from soaring ballrooms to intimate rooftop terraces.
          Every venue is maintained to the highest standard, backed by a dedicated hospitality team.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 28 }}>
        {[
          ["🏆", "Award-Winning Venues",  "Recognised by Malaysia Tourism as top event destination"],
          ["🤝", "Dedicated Concierge",   "Personal support from inquiry to event day"],
          ["📋", "Flexible Booking",      "From half-day studio hires to week-long corporate retreats"],
          ["⭐", "5-Star Reviews",        "98% guest satisfaction across 500+ events hosted"],
        ].map(([ic, h, d]) => (
          <div key={h} style={{ background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 16px rgba(13,74,74,.07)" }}>
            <div style={{ fontSize: 32, marginBottom: 14 }}>{ic}</div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "var(--teal)" }}>{h}</h3>
            <p style={{ color: "var(--mid)", fontSize: 14, lineHeight: 1.7 }}>{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
