import React, { useEffect } from "react";
import { BookingCard } from "../components/BookingCard";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { BookingTrip, getBookingTrips } from "../store/slices/tripSlice";
import { User } from "../store/slices/userSlice";

export const BookingsPage = () => {
  const dispatch = useAppDispatch();

  const user = useSelector<RootState, User>((state) => state.user.user);

  useEffect(() => {
    dispatch(getBookingTrips());
  },[]);

  const bookingTrips = useSelector<RootState, BookingTrip[]>(
    (state) => state.trips.bookingTrips
  ).filter((trip) => trip.userId === user.id);

  return (
    <main className="bookings-page">
      <h1 className="visually-hidden">Travel App</h1>
      <ul className="bookings__list">
        {[...bookingTrips]
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
              totalPrice={booking.totalPrice}
            />
          ))}
      </ul>
    </main>
  );
};
