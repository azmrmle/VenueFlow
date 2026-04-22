import { useState } from "react";
import Hero from "../components/home/Hero";
import VenueCard from "../components/home/VenueCard";
import Btn from "../components/ui/Btn";
import { VENUES } from "../data/venues";

export default function HomePage({ setPage, setSelectedVenue }) {
  const [filter, setFilter] = useState("All");
  const types    = ["All", ...new Set(VENUES.map((v) => v.type))];
  const filtered = filter === "All" ? VENUES : VENUES.filter((v) => v.type === filter);

  return (
    <div>
      <Hero onBrowse={() => document.getElementById("venues-grid")?.scrollIntoView({ behavior: "smooth" })} />

      {/* Venue grid */}
      <div id="venues-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ color: "var(--gold)", letterSpacing: 3, fontSize: 12, textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>
            Our Collection
          </p>
          <h2 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 300, color: "var(--dark)", marginBottom: 16, fontStyle: "italic" }}>
            Find your perfect space
          </h2>
          <p style={{ color: "var(--mid)", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>
            Six extraordinary venues — each with its own character, capacity, and story to tell.
          </p>
        </div>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              style={{
                padding: "8px 20px",
                borderRadius: 24,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                background: filter === t ? "var(--teal)" : "transparent",
                color:      filter === t ? "#fff"         : "var(--mid)",
                border:     filter === t ? "none"         : "1.5px solid #ccc",
                transition: "all .2s",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 28 }}>
          {filtered.map((v, i) => (
            <div key={v.id} style={{ animationDelay: `${i * 0.07}s` }}>
              <VenueCard
                venue={v}
                onClick={() => { setSelectedVenue(v); setPage("venue"); }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTA strip */}
      <div style={{ background: "var(--teal)", padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: "clamp(28px,4vw,44px)", fontWeight: 300, fontStyle: "italic", marginBottom: 16 }}>
          Not sure which venue suits your event?
        </h2>
        <p style={{ color: "rgba(255,255,255,.7)", fontSize: 16, marginBottom: 32 }}>
          Our concierge team is happy to help you choose the right space.
        </p>
        <Btn size="lg" variant="gold">Contact Our Team</Btn>
      </div>
    </div>
  );
}
