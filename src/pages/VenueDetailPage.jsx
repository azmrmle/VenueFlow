import { useState } from "react";
import Btn from "../components/ui/Btn";
import ChatWidget from "../components/venue/ChatWidget";

export default function VenueDetailPage({ venue, setPage, setBooking }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" }}>
      <button
        onClick={() => setPage("home")}
        style={{ background: "none", border: "none", color: "var(--mid)", cursor: "pointer", fontSize: 14, marginBottom: 24, display: "flex", alignItems: "center", gap: 6 }}
      >
        ← Back to Venues
      </button>

      {/* Hero image */}
      <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 40, height: "clamp(260px,45vw,500px)", background: "var(--cream2)", position: "relative" }}>
        <img
          src={venue.img}
          alt={venue.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: imgLoaded ? 1 : 0, transition: "opacity .4s" }}
          onLoad={() => setImgLoaded(true)}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(10,26,26,.6) 0%,transparent 60%)" }} />
        <div style={{ position: "absolute", bottom: 28, left: 32 }}>
          <span style={{ background: "rgba(201,168,76,.9)", color: "var(--dark)", padding: "4px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
            {venue.type}
          </span>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(30px,5vw,58px)", fontWeight: 500, color: "#fff", marginTop: 8 }}>
            {venue.name}
          </h1>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr min(340px,100%)", gap: 40, alignItems: "start" }} className="detail-grid">
        {/* Left column */}
        <div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 32 }}>
            {[
              ["👥", "Capacity",      `Up to ${venue.capacity} guests`],
              ["💰", "Starting from", `RM ${venue.price.toLocaleString()} ${venue.priceUnit}`],
            ].map(([ic, l, v]) => (
              <div key={l} style={{ background: "var(--cream2)", borderRadius: 10, padding: "16px 24px", flex: 1, minWidth: 160 }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{ic}</div>
                <div style={{ color: "var(--mid)", fontSize: 12, marginBottom: 4 }}>{l}</div>
                <div style={{ fontWeight: 600, color: "var(--teal)", fontSize: 16 }}>{v}</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 26, fontWeight: 500, marginBottom: 12 }}>About this venue</h2>
          <p style={{ color: "var(--mid)", lineHeight: 1.85, fontSize: 16, marginBottom: 32 }}>{venue.description}</p>

          <h3 style={{ fontSize: 20, fontWeight: 500, marginBottom: 16 }}>Amenities & Features</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10, marginBottom: 32 }}>
            {venue.amenities.map((a) => (
              <div key={a} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "var(--cream2)", borderRadius: 8, fontSize: 14, color: "var(--teal)", fontWeight: 500 }}>
                <span style={{ color: "var(--gold)", fontWeight: 700 }}>✓</span>{a}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {venue.tags.map((t) => (
              <span key={t} style={{ background: "var(--teal)", color: "#fff", padding: "4px 16px", borderRadius: 20, fontSize: 13, fontWeight: 500 }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right column — sticky booking card */}
        <div style={{ position: "sticky", top: 88 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 28, boxShadow: "0 4px 32px rgba(13,74,74,.12)", border: "1px solid rgba(13,74,74,.08)" }}>
            <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Book this venue</h3>
            <p style={{ color: "var(--mid)", fontSize: 14, marginBottom: 20 }}>Check availability and submit your request in minutes.</p>
            <div style={{ background: "var(--cream2)", borderRadius: 8, padding: "14px 16px", marginBottom: 20 }}>
              <div style={{ color: "var(--mid)", fontSize: 13 }}>Price from</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 600, color: "var(--teal)" }}>
                RM {venue.price.toLocaleString()}
              </div>
              <div style={{ color: "var(--light)", fontSize: 13 }}>{venue.priceUnit}</div>
            </div>
            <Btn
              size="lg"
              style={{ width: "100%", marginBottom: 12 }}
              onClick={() => {
                setBooking({ venueId: venue.id, venueName: venue.name, venuePrice: venue.price, venuePriceUnit: venue.priceUnit });
                setPage("book");
              }}
            >
              Request Booking →
            </Btn>
            <p style={{ color: "var(--light)", fontSize: 12, textAlign: "center" }}>No payment required. We'll confirm within 24 hours.</p>

            {/* AI Chat — now its own component */}
            <ChatWidget venue={venue} />
          </div>
        </div>
      </div>
    </div>
  );
}
