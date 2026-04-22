import { useState } from "react";
import Btn from "../ui/Btn";
import { inputStyle } from "../ui/inputStyle";
import { API_BASE_URL, CLAUDE_MODEL } from "../../config/constants";

/**
 * AI-powered concierge chat panel for a given venue.
 * Extracted from VenueDetailPage to keep it independently testable and reusable.
 */
export default function ChatWidget({ venue }) {
  const [open, setOpen]       = useState(false);
  const [msgs, setMsgs]       = useState([]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);

  const sendChat = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMsgs((m) => [...m, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: CLAUDE_MODEL,
          max_tokens: 400,
          system: `You are a friendly venue concierge for VenueFlow. The user is viewing "${venue.name}", a ${venue.type} venue. Details: capacity ${venue.capacity}, price RM${venue.price} ${venue.priceUnit}. Amenities: ${venue.amenities.join(", ")}. Description: ${venue.description}. Answer questions helpfully and briefly. Always encourage booking.`,
          messages: [...msgs, { role: "user", content: userMsg }],
        }),
      });
      const data  = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't get a response.";
      setMsgs((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          marginTop: 16,
          width: "100%",
          background: "none",
          border: "1.5px solid var(--teal)",
          borderRadius: 6,
          padding: "9px 0",
          color: "var(--teal)",
          fontSize: 14,
          fontWeight: 500,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        💬 Ask about this venue
      </button>

      {/* Chat panel */}
      {open && (
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            marginTop: 16,
            boxShadow: "0 4px 24px rgba(13,74,74,.12)",
            border: "1px solid rgba(13,74,74,.08)",
            overflow: "hidden",
          }}
        >
          <div style={{ background: "var(--teal)", padding: "12px 16px", color: "#fff", fontSize: 14, fontWeight: 500 }}>
            🤖 Venue Concierge
          </div>
          <div style={{ height: 220, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            {msgs.length === 0 && (
              <p style={{ color: "var(--light)", fontSize: 13, textAlign: "center", marginTop: 20 }}>
                Ask me anything about {venue.name}!
              </p>
            )}
            {msgs.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  background: m.role === "user" ? "var(--teal)" : "var(--cream2)",
                  color: m.role === "user" ? "#fff" : "var(--dark)",
                  padding: "8px 12px",
                  borderRadius: 10,
                  fontSize: 13,
                  lineHeight: 1.5,
                }}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start", color: "var(--light)", fontSize: 13, padding: "8px 12px", background: "var(--cream2)", borderRadius: 10 }}>
                Typing…
              </div>
            )}
          </div>
          <div style={{ display: "flex", borderTop: "1px solid #eee", padding: 10, gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendChat()}
              placeholder="Ask a question…"
              style={{ ...inputStyle, flex: 1, padding: "8px 12px" }}
            />
            <Btn size="sm" onClick={sendChat} disabled={loading || !input.trim()}>Send</Btn>
          </div>
        </div>
      )}
    </>
  );
}
