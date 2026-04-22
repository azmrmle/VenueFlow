export default function VenueCard({ venue, onClick }) {
  return (
    <div
      onClick={onClick}
      className="fade-up"
      style={{
        background: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: "0 2px 16px rgba(13,74,74,.08)",
        transition: "transform .25s, box-shadow .25s",
        border: "1px solid rgba(13,74,74,.07)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(13,74,74,.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 16px rgba(13,74,74,.08)";
      }}
    >
      {/* Thumbnail */}
      <div style={{ height: 200, position: "relative", overflow: "hidden" }}>
        <img
          src={venue.img}
          alt={venue.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s" }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        />
        <div style={{ position: "absolute", top: 12, left: 12 }}>
          <span
            style={{
              background: "rgba(13,74,74,.85)",
              color: "var(--gold2)",
              padding: "3px 12px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              backdropFilter: "blur(4px)",
            }}
          >
            {venue.type}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "20px 24px 24px" }}>
        <h3 style={{ fontSize: 22, fontWeight: 600, color: "var(--dark)", marginBottom: 6 }}>{venue.name}</h3>
        <p style={{ color: "var(--mid)", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
          {venue.description.slice(0, 100)}…
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {venue.tags.map((t) => (
            <span
              key={t}
              style={{
                background: "var(--cream2)",
                color: "var(--teal)",
                fontSize: 12,
                padding: "2px 10px",
                borderRadius: 20,
                fontWeight: 500,
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #f0ece4",
            paddingTop: 14,
          }}
        >
          <div>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 26, fontWeight: 600, color: "var(--teal)" }}>
              RM {venue.price.toLocaleString()}
            </span>
            <span style={{ color: "var(--light)", fontSize: 13, marginLeft: 4 }}>{venue.priceUnit}</span>
          </div>
          <span style={{ color: "var(--mid)", fontSize: 13 }}>👥 Up to {venue.capacity}</span>
        </div>
      </div>
    </div>
  );
}
