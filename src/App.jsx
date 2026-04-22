import { useState } from "react";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import VenueDetailPage from "./pages/VenueDetailPage";
import BookingPage from "./pages/BookingPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AboutPage from "./pages/AboutPage";
import { useBookings } from "./hooks/useBookings";

export default function App() {
  const [page,          setPage]          = useState("home");
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [booking,       setBooking]       = useState(null);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  // All booking state is managed by the custom hook
  const { bookings, addBooking, updateStatus, updateNote } = useBookings();

  // Wrapper so child pages can still call setBookings pattern
  const [bookingsState, setBookingsState] = useState(null);

  return (
    <>
      <Nav
        page={page}
        setPage={setPage}
        adminLoggedIn={adminLoggedIn}
        setAdminLoggedIn={setAdminLoggedIn}
      />
      <main style={{ minHeight: "calc(100vh - 64px)" }}>
        {page === "home" && (
          <HomePage setPage={setPage} setSelectedVenue={setSelectedVenue} />
        )}
        {page === "venue" && selectedVenue && (
          <VenueDetailPage venue={selectedVenue} setPage={setPage} setBooking={setBooking} />
        )}
        {page === "book" && booking && (
          <BookingPage
            booking={booking}
            setPage={setPage}
            bookings={bookings}
            setBookings={(updated) => {
              // Sync with the hook's internal state by finding new entries
              const newEntry = updated.find((b) => !bookings.find((ob) => ob.id === b.id));
              if (newEntry) addBooking({ ...newEntry, id: undefined }); // hook re-generates id
            }}
          />
        )}
        {page === "admin" && adminLoggedIn && (
          <AdminDashboardPage
            bookings={bookings}
            setBookings={(updated) => {
              // Propagate status/note changes through hook methods
              updated.forEach((b) => {
                const old = bookings.find((ob) => ob.id === b.id);
                if (old && old.status    !== b.status)    updateStatus(b.id, b.status);
                if (old && old.adminNote !== b.adminNote) updateNote(b.id, b.adminNote);
              });
            }}
          />
        )}
        {page === "adminLogin" && (
          <AdminLoginPage setPage={setPage} setAdminLoggedIn={setAdminLoggedIn} />
        )}
        {page === "about" && <AboutPage />}
      </main>
      <Footer />
    </>
  );
}
