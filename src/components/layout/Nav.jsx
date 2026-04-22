import { useState } from "react";
import Btn from "../ui/Btn";

export default function Nav({ page, setPage, adminLoggedIn, setAdminLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(250,247,242,.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e0d9cc",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* Logo */}
        <button
          onClick={() => setPage("home")}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 26,
              fontWeight: 600,
              color: "var(--teal)",
              letterSpacing: 1,
            }}
          >
            Venue<span style={{ color: "var(--gold)" }}>Flow</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }} className="desktop-nav">
          {[["home", "Venues"], ["about", "About"]].map(([p, l]) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{
                background: "none",
                border: "none",
                padding: "8px 16px",
                fontWeight: 500,
                fontSize: 14,
                color: page === p ? "var(--teal)" : "var(--mid)",
                borderBottom: page === p ? "2px solid var(--gold)" : "2px solid transparent",
                cursor: "pointer",
              }}
            >
              {l}
            </button>
          ))}
          {adminLoggedIn ? (
            <>
              <Btn size="sm" onClick={() => setPage("admin")} variant={page === "admin" ? "primary" : "outline"}>
                Dashboard
              </Btn>
              <Btn size="sm" variant="ghost" onClick={() => { setAdminLoggedIn(false); setPage("home"); }}>
                Logout
              </Btn>
            </>
          ) : (
            <Btn size="sm" variant="outline" onClick={() => setPage("adminLogin")}>
              Admin Login
            </Btn>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          style={{ display: "none", background: "none", border: "none", fontSize: 22, color: "var(--teal)" }}
          className="mob-menu-btn"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--cream)",
            borderTop: "1px solid #e0d9cc",
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
          className="mob-menu"
        >
          {[["home", "Venues"], ["about", "About"]].map(([p, l]) => (
            <button
              key={p}
              onClick={() => { setPage(p); setMenuOpen(false); }}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                padding: "10px 0",
                fontWeight: 500,
                fontSize: 15,
                color: "var(--teal)",
                cursor: "pointer",
              }}
            >
              {l}
            </button>
          ))}
          {adminLoggedIn ? (
            <>
              <Btn onClick={() => { setPage("admin"); setMenuOpen(false); }}>Dashboard</Btn>
              <Btn variant="ghost" onClick={() => { setAdminLoggedIn(false); setPage("home"); }}>Logout</Btn>
            </>
          ) : (
            <Btn variant="outline" onClick={() => { setPage("adminLogin"); setMenuOpen(false); }}>
              Admin Login
            </Btn>
          )}
        </div>
      )}
    </nav>
  );
}
