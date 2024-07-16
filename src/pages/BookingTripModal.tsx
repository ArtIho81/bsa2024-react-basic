import React from "react";
import { Level } from "../components/TripCard";
import { useInput } from "../hooks/useInput";
import { SignInput } from "../components/SignInput";
import { Button } from "../components/Button";
import { isDateValid, isGuestsValid } from "../helpers/validation";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { User } from "../store/slices/userSlice";
import { BookingTripRequest } from "../api/requests";
import { bookTrip } from "../store/slices/tripSlice";

type BookingTripModalProps = {
  id: string;
  title: string;
  level: Level;
  duration: number;
  price: number;
  onClose: () => void;
};

export const BookingTripModal: React.FC<BookingTripModalProps> = (props) => {
  const { id, title, duration, level, price, onClose } = props;
  const user = useSelector<RootState, User>((state) => state.user.user);
  const dispatch = useAppDispatch();

  const guestsInput = useInput("1");
  const dateInput = useInput("");

  const bookingTrip = (date: string, guests: number) => {
    if (isDateValid(date) && isGuestsValid(guests)) {
      const bookingTrip: BookingTripRequest = {
        tripId: id,
        guests,
        date,
      };
      dispatch(bookTrip(bookingTrip));
      onClose();
    }
  };

  return (
    <div className="modal">
      <div data-test-id="book-trip-popup" className="book-trip-popup">
        <button
          data-test-id="book-trip-popup-close"
          className="book-trip-popup__close"
          onClick={onClose}
        >
          ×
        </button>
        <form className="book-trip-popup__form" autoComplete="off">
          <div className="trip-info">
            <h3
              data-test-id="book-trip-popup-title"
              className="trip-info__title"
            >
              {title}
            </h3>
            <div className="trip-info__content">
              <span
                data-test-id="book-trip-popup-duration"
                className="trip-info__duration"
              >
                <strong>{duration}</strong> days
              </span>
              <span
                data-test-id="book-trip-popup-level"
                className="trip-info__level"
              >
                {level}
              </span>
            </div>
          </div>
          <SignInput
            title="Date"
            id="book-trip-popup-date"
            name="date"
            type="date"
            {...dateInput}
          />
          <SignInput
            title="Number of guests"
            id="book-trip-popup-guests"
            name="guests"
            type="number"
            min="1"
            max="10"
            {...guestsInput}
          />
          <span className="book-trip-popup__total">
            Total:
            <output
              data-test-id="book-trip-popup-total-value"
              className="book-trip-popup__total-value"
            >
              ${price && price * +guestsInput.value}
            </output>
          </span>
          <Button
            title="Book a trip"
            id="book-trip-popup-submit"
            type="button"
            onClick={() => bookingTrip(dateInput.value, +guestsInput.value)}
          />
        </form>
      </div>
    </div>
  );
};
