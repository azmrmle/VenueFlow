import { INIT_BOOKINGS } from "../data/mockBookings";

/** Load bookings from localStorage, falling back to seed data. */
export function getBookings() {
  try {
    const stored = localStorage.getItem("vf_bookings");
    return stored ? JSON.parse(stored) : INIT_BOOKINGS;
  } catch {
    return INIT_BOOKINGS;
  }
}

/** Persist bookings array to localStorage. */
export function saveBookings(bookings) {
  try {
    localStorage.setItem("vf_bookings", JSON.stringify(bookings));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

/** Generate the next sequential booking ID (e.g. "BK-0005"). */
export function genId(bookings) {
  const max = bookings.reduce(
    (m, b) => Math.max(m, parseInt(b.id.split("-")[1]) || 0),
    0
  );
  return `BK-${String(max + 1).padStart(4, "0")}`;
}

/** Return today's date as an ISO string (YYYY-MM-DD). */
export function today() {
  return new Date().toISOString().split("T")[0];
}
