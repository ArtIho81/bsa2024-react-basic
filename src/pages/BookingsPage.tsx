import React from "react";
import { BookingCard } from "../components/BookingCard";
import { BoockingTrip } from "../App";

type BookingPageProps = {
  bookingTrips: BoockingTrip[];
  onDisappear: (id: string) => void;
};

export const BookingsPage: React.FC<BookingPageProps> = ({
  bookingTrips,
  onDisappear,
}) => {
  return (
    <main className="bookings-page">
      <h1 className="visually-hidden">Travel App</h1>
      <ul className="bookings__list">
        {bookingTrips
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .map((booking) => (
            <BookingCard
              key={booking.id}
              id={booking.id}
              title={booking.trip.title}
              guests={booking.guests}
              date={booking.date}
              totalPrice={booking.trip.price * booking.guests}
              onClick={() => onDisappear(booking.id)}
            />
          ))}
      </ul>
    </main>
  );
};
