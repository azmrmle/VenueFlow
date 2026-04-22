import { useState } from "react";
import { getBookings, saveBookings, genId } from "../utils/bookingUtils";

/**
 * Custom hook that encapsulates all booking state management.
 * Exposes bookings array + CRUD operations so pages don't need
 * to handle localStorage directly.
 */
export function useBookings() {
  const [bookings, setBookings] = useState(getBookings);

  /** Add a new booking and persist to localStorage. */
  function addBooking(newBooking) {
    const withId = { ...newBooking, id: genId(bookings) };
    const updated = [...bookings, withId];
    setBookings(updated);
    saveBookings(updated);
    return withId;
  }

  /** Update the status of a booking by ID. */
  function updateStatus(id, status) {
    const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    setBookings(updated);
    saveBookings(updated);
  }

  /** Save an admin note against a booking by ID. */
  function updateNote(id, note) {
    const updated = bookings.map((b) => (b.id === id ? { ...b, adminNote: note } : b));
    setBookings(updated);
    saveBookings(updated);
  }

  return { bookings, addBooking, updateStatus, updateNote };
}
