import React from "react";
import { RootState, useAppDispatch } from "../store/store";
import { cancelBookingTrip } from "../store/slices/tripSlice";
import { useSelector } from "react-redux";
import { User } from "../store/slices/userSlice";

type BookingCardProps = {
  id: string;
  title: string;
  guests: number;
  date: string;
  totalPrice: number;
};

export const BookingCard: React.FC<BookingCardProps> = (props) => {
  const { id, title, guests, date, totalPrice } = props;
  const dispatch = useAppDispatch();

  return (
    <li data-test-id="booking" className="booking">
      <h3 data-test-id="booking-title" className="booking__title">
        {title}
      </h3>
      <span data-test-id="booking-guests" className="booking__guests">
        {guests} guests
      </span>
      <span data-test-id="booking-date" className="booking__date">
        {date.split("T")[0]}
      </span>
      <span data-test-id="booking-total" className="booking__total">
        ${totalPrice}
      </span>
      <button
        data-test-id="booking-cancel"
        className="booking__cancel"
        title="Cancel booking"
        onClick={() => dispatch(cancelBookingTrip({ id }))}
      >
        <span className="visually-hidden">Cancel booking</span>×
      </button>
    </li>
  );
};
