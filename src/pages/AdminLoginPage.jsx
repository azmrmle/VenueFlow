import { useState } from "react";
import Btn from "../components/ui/Btn";
import Field from "../components/ui/Field";
import { inputStyle } from "../components/ui/inputStyle";
import { ADMIN_PASS } from "../config/constants";

export default function AdminLoginPage({ setPage, setAdminLoggedIn }) {
  const [pw, setPw]   = useState("");
  const [err, setErr] = useState("");

  const login = () => {
    if (pw === ADMIN_PASS) {
      setAdminLoggedIn(true);
      setPage("admin");
    } else {
      setErr("Incorrect password. (Hint: admin123)");
    }
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 400 }} className="fade-in">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 16px" }}>
            🔐
          </div>
          <h2 style={{ fontSize: 30, fontWeight: 400, fontStyle: "italic" }}>Admin Access</h2>
          <p style={{ color: "var(--mid)", fontSize: 14, marginTop: 8 }}>Sign in to manage bookings</p>
        </div>

        <div style={{ background: "#fff", borderRadius: 14, padding: 32, boxShadow: "0 4px 32px rgba(13,74,74,.1)" }}>
          <Field label="Admin Password" error={err}>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              style={{ ...inputStyle, borderColor: err ? "var(--err)" : "#d0cfc9" }}
              placeholder="Enter password"
            />
          </Field>
          <Btn size="lg" style={{ width: "100%" }} onClick={login}>Sign In →</Btn>
        </div>
      </div>
    </div>
  );
}
