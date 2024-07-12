import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Trip } from "./MainPage";
import allTrips from "../data/trips.json";
import { BookingTripModal } from "./BookingTripModal";
import { Button } from "../components/Button";
import { BoockingTrip } from "../App";

type TripPageProps = {
  onBooking: (trip: BoockingTrip) => void;
};
export const TripPage: React.FC<TripPageProps> = ({ onBooking }) => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip>();
  const [bookingTrip, setBookingTrip] = useState<boolean>(false);

  useEffect(() => {
    setTrip((allTrips as Trip[]).find((trip) => trip.id === tripId));
  }, []);

  return trip ? (
    <main className="trip-page">
      <h1 className="visually-hidden">Travel App</h1>
      <div className="trip">
        <img
          data-test-id="trip-details-image"
          src={trip.image}
          className="trip__img"
          alt="trip photo"
        />
        <div className="trip__content">
          <div className="trip-info">
            <h3 data-test-id="trip-details-title" className="trip-info__title">
              {trip.title}
            </h3>
            <div className="trip-info__content">
              <span
                data-test-id="trip-details-duration"
                className="trip-info__duration"
              >
                <strong>{trip.duration}</strong> days
              </span>
              <span
                data-test-id="trip-details-level"
                className="trip-info__level"
              >
                {trip.level}
              </span>
            </div>
          </div>
          <div
            data-test-id="trip-details-description"
            className="trip__description"
          >
            {trip.description}
          </div>
          <div className="trip-price">
            <span>Price</span>
            <strong
              data-test-id="trip-details-price-value"
              className="trip-price__value"
            >
              ${trip.price}
            </strong>
          </div>
          <Button
            title="Book a trip"
            id="trip-details-button"
            className="trip__button"
            onClick={() => setBookingTrip(true)}
          />
        </div>
      </div>
      {bookingTrip && (
        <BookingTripModal
          id={trip.id}
          title={trip.title}
          duration={trip.duration}
          level={trip.level}
          price={trip.price}
          onClose={() => setBookingTrip(false)}
          onBooking={onBooking}
        />
      )}
    </main>
  ) : null;
};
