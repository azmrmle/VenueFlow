import { useState } from "react";
import Btn from "../components/ui/Btn";
import Badge from "../components/ui/Badge";
import { inputStyle } from "../components/ui/inputStyle";
import { VENUES } from "../data/venues";
import { SLOTS, PACKAGES } from "../data/bookingOptions";
import { useBookings } from "../hooks/useBookings";

export default function AdminDashboardPage({ bookings, setBookings }) {
  const { updateStatus, updateNote } = useBookings();

  const [filterStatus, setFilterStatus] = useState("all");
  const [filterVenue,  setFilterVenue]  = useState("all");
  const [search,       setSearch]       = useState("");
  const [selected,     setSelected]     = useState(null);
  const [noteEdit,     setNoteEdit]     = useState("");

  /* Wrap hook methods so they also update parent state */
  const handleUpdateStatus = (id, status) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    setBookings(updated);
    if (selected?.id === id) setSelected((s) => ({ ...s, status }));
  };

  const handleUpdateNote = (id, note) => {
    const updated = bookings.map((b) => (b.id === id ? { ...b, adminNote: note } : b));
    setBookings(updated);
    setSelected((s) => ({ ...s, adminNote: note }));
  };

  const filtered = bookings.filter((b) => {
    if (filterStatus !== "all" && b.status   !== filterStatus)  return false;
    if (filterVenue  !== "all" && b.venueId  !== +filterVenue)  return false;
    if (search && !`${b.name}${b.email}${b.id}${b.venueName}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total:     bookings.length,
    pending:   bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 80px" }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 300, fontStyle: "italic" }}>Admin Dashboard</h2>
        <p style={{ color: "var(--mid)", fontSize: 15 }}>Manage all venue booking requests</p>
      </div>

      {/* Stats cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 16, marginBottom: 36 }}>
        {[
          ["Total Bookings", stats.total,     "var(--teal)",    "📋"],
          ["Pending",        stats.pending,   "#b7860a",        "⏳"],
          ["Confirmed",      stats.confirmed, "var(--success)", "✅"],
          ["Cancelled",      stats.cancelled, "var(--err)",     "❌"],
        ].map(([l, v, c, ic]) => (
          <div key={l} style={{ background: "#fff", borderRadius: 10, padding: "20px", boxShadow: "0 2px 12px rgba(13,74,74,.07)", borderTop: `3px solid ${c}` }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{ic}</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 600, color: c }}>{v}</div>
            <div style={{ color: "var(--mid)", fontSize: 13 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24, alignItems: "center" }}>
        <input
          value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, ID…"
          style={{ ...inputStyle, maxWidth: 280 }}
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ ...inputStyle, width: "auto" }}>
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select value={filterVenue} onChange={(e) => setFilterVenue(e.target.value)} style={{ ...inputStyle, width: "auto" }}>
          <option value="all">All Venues</option>
          {VENUES.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 16px rgba(13,74,74,.08)" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "var(--teal)", color: "#fff" }}>
                {["Ref", "Venue", "Date", "Slot", "Guest", "Status", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 500, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{ padding: "40px 0", textAlign: "center", color: "var(--light)" }}>No bookings found.</td></tr>
              )}
              {filtered.map((b, i) => (
                <tr
                  key={b.id}
                  style={{ borderBottom: "1px solid #f0ece4", background: i % 2 === 0 ? "#fff" : "#faf9f7", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(13,74,74,.04)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#faf9f7")}
                >
                  <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--teal)" }}>{b.id}</td>
                  <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>{b.venueName}</td>
                  <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>{b.date}</td>
                  <td style={{ padding: "12px 16px", whiteSpace: "nowrap", textTransform: "capitalize" }}>{b.slot}</td>
                  <td style={{ padding: "12px 16px" }}>{b.name}</td>
                  <td style={{ padding: "12px 16px" }}><Badge status={b.status} /></td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <Btn size="sm" variant="ghost" onClick={() => { setSelected(b); setNoteEdit(b.adminNote || ""); }}>View</Btn>
                      {b.status !== "confirmed" && <Btn size="sm" variant="success" onClick={(e) => { e.stopPropagation(); handleUpdateStatus(b.id, "confirmed"); }}>✓</Btn>}
                      {b.status !== "cancelled" && <Btn size="sm" variant="danger"  onClick={(e) => { e.stopPropagation(); handleUpdateStatus(b.id, "cancelled"); }}>✗</Btn>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(10,26,26,.6)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 540, maxHeight: "90vh", overflowY: "auto", padding: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="fade-in"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 24, fontWeight: 600 }}>{selected.id}</h3>
                <Badge status={selected.status} />
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", fontSize: 22, color: "var(--mid)", cursor: "pointer" }}>×</button>
            </div>

            {[
              ["Venue",        selected.venueName],
              ["Date",         selected.date],
              ["Slot",         SLOTS.find((s) => s.id === selected.slot)?.label],
              ["Package",      PACKAGES.find((p) => p.id === selected.pkg)?.label],
              ["Guest Name",   selected.name],
              ["Organisation", selected.org || "—"],
              ["Email",        selected.email],
              ["Phone",        selected.phone],
              ["Guest Count",  selected.guests],
              ["Special Notes",selected.notes || "—"],
              ["Submitted",    selected.submitted],
              ["Est. Price",   selected.price ? `RM ${selected.price.toLocaleString()}` : "—"],
            ].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #f0ece4", fontSize: 14, gap: 12 }}>
                <span style={{ color: "var(--mid)", minWidth: 120 }}>{l}</span>
                <strong style={{ textAlign: "right" }}>{v}</strong>
              </div>
            ))}

            <div style={{ marginTop: 20 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--mid)", marginBottom: 6 }}>Admin Note</label>
              <textarea
                rows={3} value={noteEdit}
                onChange={(e) => setNoteEdit(e.target.value)}
                style={{ ...inputStyle, resize: "vertical", marginBottom: 10 }}
                placeholder="Internal note…"
              />
              <Btn size="sm" variant="outline" onClick={() => handleUpdateNote(selected.id, noteEdit)}>Save Note</Btn>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
              {selected.status !== "confirmed" && <Btn variant="success" onClick={() => handleUpdateStatus(selected.id, "confirmed")}>✓ Confirm Booking</Btn>}
              {selected.status !== "pending"   && <Btn variant="outline" onClick={() => handleUpdateStatus(selected.id, "pending")}>↩ Set Pending</Btn>}
              {selected.status !== "cancelled" && <Btn variant="danger"  onClick={() => handleUpdateStatus(selected.id, "cancelled")}>✗ Cancel Booking</Btn>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
