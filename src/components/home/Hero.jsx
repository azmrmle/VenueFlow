import Btn from "../ui/Btn";

export default function Hero({ onBrowse }) {
  return (
    <div
      style={{
        minHeight: "88vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(160deg,var(--teal) 0%,var(--teal2) 55%,#1a4040 100%)",
        position: "relative",
        overflow: "hidden",
        padding: "60px 24px",
      }}
    >
      {/* Decorative circles */}
      {[
        ["-120px", "-80px",  "400px", "400px", "rgba(201,168,76,.08)", undefined],
        [null,     "-60px",  "260px", "260px", "rgba(255,255,255,.04)", "0"],
      ].map(([t, r, w, h, bg, b], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top:    t || "auto",
            right:  r || "auto",
            bottom: b !== undefined ? b : "auto",
            width: w, height: h,
            borderRadius: "50%",
            background: bg,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Background image overlay */}
      <div
        style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=60')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.12,
        }}
      />

      <div style={{ position: "relative", textAlign: "center", maxWidth: 760 }}>
        <p className="fade-up d1" style={{ color: "var(--gold2)", letterSpacing: 4, fontSize: 13, fontWeight: 500, textTransform: "uppercase", marginBottom: 20 }}>
          Premier Event Spaces
        </p>
        <h1
          className="fade-up d2"
          style={{ fontSize: "clamp(42px,8vw,88px)", fontWeight: 300, color: "#fff", lineHeight: 1.05, marginBottom: 24, fontStyle: "italic" }}
        >
          Every occasion deserves<br />
          <span style={{ color: "var(--gold2)", fontStyle: "normal", fontWeight: 600 }}>a perfect stage.</span>
        </h1>
        <p className="fade-up d3" style={{ color: "rgba(255,255,255,.75)", fontSize: 18, lineHeight: 1.7, marginBottom: 40, maxWidth: 540, margin: "0 auto 40px" }}>
          From intimate dinners to grand galas — browse our collection of exceptional venues and book your next unforgettable event.
        </p>
        <div className="fade-up d4" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn size="lg" variant="gold" onClick={onBrowse}>Explore Venues</Btn>
          <Btn size="lg" variant="outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,.5)" }} onClick={onBrowse}>
            View Availability
          </Btn>
        </div>
        <div className="fade-up d5" style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 60, flexWrap: "wrap" }}>
          {[["6", "Unique Venues"], ["500+", "Events Hosted"], ["98%", "Guest Satisfaction"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 38, fontWeight: 600, color: "var(--gold2)" }}>{n}</div>
              <div style={{ color: "rgba(255,255,255,.6)", fontSize: 13, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
