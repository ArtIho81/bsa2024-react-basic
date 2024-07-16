import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { MainPage } from "./pages/MainPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { TripPage } from "./pages/TripPage";
import { BookingsPage } from "./pages/BookingsPage";
import { SignUpPage } from "./pages/SignUpPage";
import { SignInPage } from "./pages/SignInPage";
import mockBooking from "./data/bookings.json";

import { useState } from "react";

export type BoockingTrip = {
  id: string;
  userId: string;
  tripId: string;
  guests: number;
  date: string;
  trip: {
    title: string;
    duration: number;
    price: number;
  };
  totalPrice: number;
  createdAt: string;
};
function App() {
  const [bookingTrips, setBookingTrips] = useState<BoockingTrip[]>(mockBooking);

  const disappearBooking = (id: string) => {
    setBookingTrips(bookingTrips.filter((booking) => booking.id !== id));
  };

  const makeBookingTrip = (trip: BoockingTrip) => {
    setBookingTrips([...bookingTrips, trip]);
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route
          path="/trip/:tripId"
          element={<TripPage />}
        />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
