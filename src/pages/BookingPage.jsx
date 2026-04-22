import { useState } from "react";
import Btn from "../components/ui/Btn";
import Field from "../components/ui/Field";
import { inputStyle } from "../components/ui/inputStyle";
import { VENUES } from "../data/venues";
import { SLOTS, PACKAGES } from "../data/bookingOptions";
import { today, genId } from "../utils/bookingUtils";
import { saveBookings } from "../utils/bookingUtils";

export default function BookingPage({ booking, setPage, bookings, setBookings }) {
  const [step, setStep]           = useState(1);
  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(null);
  const venue = VENUES.find((v) => v.id === booking.venueId);

  const [form, setForm] = useState({
    date: "", slot: "", pkg: "basic",
    name: "", org: "", email: "", phone: "", guests: "", notes: "",
  });

  const up = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const bookedDates = bookings
    .filter((b) => b.venueId === booking.venueId && b.status !== "cancelled")
    .map((b) => b.date);

  const calcPrice = () => {
    const slot = SLOTS.find((s) => s.id === form.slot);
    const pkg  = PACKAGES.find((p) => p.id === form.pkg);
    if (!slot || !pkg) return null;
    const mult = form.slot === "fullday" ? 1 : 0.45;
    return Math.round(venue.price * mult * pkg.multiplier);
  };

  const validate = () => {
    const e = {};
    if (step === 1) {
      if (!form.date) e.date = "Please select a date";
      if (!form.slot) e.slot = "Please choose a time slot";
    }
    if (step === 2) {
      if (!form.name.trim())                         e.name   = "Name is required";
      if (!form.email.match(/\S+@\S+\.\S+/))         e.email  = "Valid email required";
      if (!form.phone.trim())                         e.phone  = "Phone is required";
      if (!form.guests || isNaN(form.guests) || +form.guests < 1) e.guests = "Enter number of guests";
      if (+form.guests > venue.capacity)              e.guests = `Max capacity is ${venue.capacity}`;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep((s) => s + 1); };

  const submit = () => {
    if (!validate()) return;
    const newBk = {
      id: genId(bookings),
      venueId: booking.venueId, venueName: booking.venueName,
      date: form.date, slot: form.slot, pkg: form.pkg,
      name: form.name, org: form.org, email: form.email,
      phone: form.phone, guests: form.guests, notes: form.notes,
      status: "pending", submitted: today(),
      price: calcPrice(),
    };
    const updated = [...bookings, newBk];
    setBookings(updated);
    saveBookings(updated);
    setSubmitted(newBk);
  };

  /* ── Success screen ── */
  if (submitted) return (
    <div style={{ maxWidth: 560, margin: "80px auto", padding: "0 24px", textAlign: "center" }} className="fade-in">
      <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 24px" }}>✓</div>
      <h2 style={{ fontSize: 36, fontWeight: 300, fontStyle: "italic", marginBottom: 12 }}>Booking Submitted!</h2>
      <p style={{ color: "var(--mid)", fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
        Your request for <strong>{booking.venueName}</strong> has been received. We'll confirm within 24 hours.
      </p>
      <div style={{ background: "var(--cream2)", borderRadius: 12, padding: 24, textAlign: "left", marginBottom: 32 }}>
        {[
          ["Reference",  submitted.id],
          ["Venue",      submitted.venueName],
          ["Date",       submitted.date],
          ["Slot",       SLOTS.find((s) => s.id === submitted.slot)?.label],
          ["Package",    PACKAGES.find((p) => p.id === submitted.pkg)?.label],
          ["Name",       submitted.name],
          ["Guests",     submitted.guests],
          ["Est. Price", submitted.price ? `RM ${submitted.price.toLocaleString()}` : "TBD"],
        ].map(([l, v]) => (
          <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e8e2d6", fontSize: 14 }}>
            <span style={{ color: "var(--mid)" }}>{l}</span><strong>{v}</strong>
          </div>
        ))}
      </div>
      <Btn size="lg" onClick={() => setPage("home")}>Back to Venues</Btn>
    </div>
  );

  const price = calcPrice();

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 80px" }}>
      <button
        onClick={() => (step > 1 ? setStep((s) => s - 1) : setPage("venue"))}
        style={{ background: "none", border: "none", color: "var(--mid)", cursor: "pointer", fontSize: 14, marginBottom: 24 }}
      >
        ← {step > 1 ? "Back" : "Back to Venue"}
      </button>

      <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 300, fontStyle: "italic", marginBottom: 8 }}>
        Book {venue.name}
      </h2>

      {/* Progress bar */}
      <div style={{ display: "flex", gap: 0, marginBottom: 40, borderRadius: 8, overflow: "hidden", border: "1px solid #ddd" }}>
        {[["1", "Date & Slot"], ["2", "Your Details"], ["3", "Review"]].map(([n, l]) => (
          <div
            key={n}
            style={{
              flex: 1, padding: "12px 0", textAlign: "center",
              background: +n <= step ? "var(--teal)" : "#f8f8f8",
              color:      +n <= step ? "#fff"         : "var(--light)",
              fontSize: 13, fontWeight: 500, transition: "all .3s",
            }}
          >
            <span style={{ opacity: 0.7, marginRight: 6 }}>{n}.</span>{l}
          </div>
        ))}
      </div>

      {/* Step 1 — Date & Slot */}
      {step === 1 && (
        <div className="fade-in">
          <Field label="Select Date *" error={errors.date}>
            <input
              type="date" value={form.date} min={today()}
              onChange={(e) => up("date", e.target.value)}
              style={{ ...inputStyle, borderColor: errors.date ? "var(--err)" : "#d0cfc9" }}
            />
            {bookedDates.length > 0 && (
              <p style={{ color: "var(--mid)", fontSize: 12, marginTop: 6 }}>⚠️ Dates with existing bookings: {bookedDates.join(", ")}</p>
            )}
            {form.date && bookedDates.includes(form.date) && (
              <p style={{ color: "var(--err)", fontSize: 12, marginTop: 4 }}>This date already has a booking. Please choose another.</p>
            )}
          </Field>

          <Field label="Choose Time Slot *" error={errors.slot}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {SLOTS.map((s) => (
                <div
                  key={s.id}
                  onClick={() => up("slot", s.id)}
                  style={{
                    border: `2px solid ${form.slot === s.id ? "var(--teal)" : "#ddd"}`,
                    borderRadius: 10, padding: "14px 16px", cursor: "pointer",
                    background: form.slot === s.id ? "rgba(13,74,74,.05)" : "#fff",
                    transition: "all .2s",
                  }}
                >
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: "var(--teal)" }}>{s.label}</div>
                  <div style={{ color: "var(--mid)", fontSize: 12 }}>{s.time}</div>
                </div>
              ))}
            </div>
          </Field>

          <Field label="Package">
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {PACKAGES.map((p) => {
                const pct     = Math.round((p.multiplier - 1) * 100);
                const estBase = Math.round(venue.price * 0.45 * p.multiplier); // half-day estimate
                const pctLabel = pct === 0 ? "Base price" : `+${pct}% on base`;
                return (
                  <div
                    key={p.id}
                    onClick={() => up("pkg", p.id)}
                    style={{
                      border: `2px solid ${form.pkg === p.id ? "var(--gold)" : "#ddd"}`,
                      borderRadius: 10, padding: "14px 18px", cursor: "pointer",
                      background: form.pkg === p.id ? "rgba(201,168,76,.06)" : "#fff",
                      display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                      transition: "all .2s",
                    }}
                  >
                    {/* Left: name + description */}
                    <div>
                      <div style={{ fontWeight: 600, color: "var(--dark)", marginBottom: 2 }}>{p.label}</div>
                      <div style={{ color: "var(--mid)", fontSize: 13 }}>{p.desc}</div>
                    </div>

                    {/* Right: % badge + est. price */}
                    <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 16 }}>
                      <div style={{
                        display: "inline-block",
                        background: pct === 0 ? "var(--cream2)" : "rgba(201,168,76,.15)",
                        color: pct === 0 ? "var(--mid)" : "var(--gold)",
                        border: `1px solid ${pct === 0 ? "#ddd" : "var(--gold)"}`,
                        borderRadius: 20,
                        padding: "2px 10px",
                        fontSize: 12,
                        fontWeight: 600,
                        marginBottom: 4,
                      }}>
                        {pctLabel}
                      </div>
                      <div style={{ color: "var(--teal)", fontSize: 13, fontWeight: 600 }}>
                        from RM {estBase.toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Field>

          <Btn
            size="lg" style={{ width: "100%" }} onClick={next}
            disabled={!form.date || !form.slot || bookedDates.includes(form.date)}
          >
            Continue →
          </Btn>
        </div>
      )}

      {/* Step 2 — Contact Details */}
      {step === 2 && (
        <div className="fade-in">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="Full Name *" error={errors.name}>
              <input style={{ ...inputStyle, borderColor: errors.name ? "var(--err)" : "#d0cfc9" }} value={form.name} onChange={(e) => up("name", e.target.value)} placeholder="Your full name" />
            </Field>
            <Field label="Organisation / Company">
              <input style={inputStyle} value={form.org} onChange={(e) => up("org", e.target.value)} placeholder="Optional" />
            </Field>
            <Field label="Email Address *" error={errors.email}>
              <input type="email" style={{ ...inputStyle, borderColor: errors.email ? "var(--err)" : "#d0cfc9" }} value={form.email} onChange={(e) => up("email", e.target.value)} placeholder="you@example.com" />
            </Field>
            <Field label="Phone Number *" error={errors.phone}>
              <input
                type="tel"
                style={{ ...inputStyle, borderColor: errors.phone ? "var(--err)" : "#d0cfc9" }}
                value={form.phone}
                onChange={(e) => {
                  // Strip anything that isn't a digit or dash
                  const cleaned = e.target.value.replace(/[^\d\-+]/g, "");
                  up("phone", cleaned);
                }}
                onKeyDown={(e) => {
                  // Allow: digits, dash, plus, backspace, delete, tab, arrows, home, end
                  const allowed = /[\d\-+]/.test(e.key) || [
                    "Backspace","Delete","Tab","ArrowLeft","ArrowRight","Home","End"
                  ].includes(e.key);
                  if (!allowed) e.preventDefault();
                }}
                placeholder="01X-XXXXXXX"
                maxLength={15}
              />
            </Field>
            <Field label={`Number of Guests * (max ${venue.capacity})`} error={errors.guests}>
              <input type="number" min="1" max={venue.capacity} style={{ ...inputStyle, borderColor: errors.guests ? "var(--err)" : "#d0cfc9" }} value={form.guests} onChange={(e) => up("guests", e.target.value)} placeholder="e.g. 150" />
            </Field>
          </div>
          <Field label="Special Requests / Notes">
            <textarea rows={3} style={{ ...inputStyle, resize: "vertical" }} value={form.notes} onChange={(e) => up("notes", e.target.value)} placeholder="Any special requirements, dietary needs, setup preferences…" />
          </Field>
          <Btn size="lg" style={{ width: "100%" }} onClick={next}>Review Booking →</Btn>
        </div>
      )}

      {/* Step 3 — Review */}
      {step === 3 && (
        <div className="fade-in">
          <div style={{ background: "var(--cream2)", borderRadius: 12, padding: 28, marginBottom: 24 }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: "var(--teal)" }}>Booking Summary</h3>
            {[
              ["Venue",        venue.name],
              ["Date",         form.date],
              ["Slot",         `${SLOTS.find((s) => s.id === form.slot)?.icon} ${SLOTS.find((s) => s.id === form.slot)?.label} (${SLOTS.find((s) => s.id === form.slot)?.time})`],
              ["Package",      PACKAGES.find((p) => p.id === form.pkg)?.label],
              ["Name",         form.name],
              ["Organisation", form.org || "—"],
              ["Email",        form.email],
              ["Phone",        form.phone],
              ["Guests",       form.guests],
              ["Notes",        form.notes || "—"],
            ].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #e0d8cc", fontSize: 14, flexWrap: "wrap", gap: 8 }}>
                <span style={{ color: "var(--mid)" }}>{l}</span>
                <strong style={{ color: "var(--dark)", textAlign: "right" }}>{v}</strong>
              </div>
            ))}
            {price && (
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 16, marginTop: 4 }}>
                <span style={{ fontWeight: 600, fontSize: 15 }}>Estimated Total</span>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 600, color: "var(--teal)" }}>
                  RM {price.toLocaleString()}
                </span>
              </div>
            )}
          </div>
          <div style={{ background: "rgba(201,168,76,.1)", border: "1px solid var(--gold)", borderRadius: 8, padding: "12px 16px", marginBottom: 24, fontSize: 13, color: "var(--mid)" }}>
            ℹ️ No payment is required now. Our team will contact you within 24 hours to confirm your booking.
          </div>
          <Btn size="lg" variant="gold" style={{ width: "100%" }} onClick={submit}>Confirm & Submit Request ✓</Btn>
        </div>
      )}
    </div>
  );
}
