import React from "react";
import { TripCard } from "./TripCard";
import { Trip } from "../pages/MainPage";

type TripsProps = {
  trips: Trip[];
};

export const TripList: React.FC<TripsProps> = ({ trips }) => {
  return (
    <ul className="trip-list">
      {trips.map((trip) => (
        <TripCard
          key={trip.id}
          id={trip.id}
          image={trip.image}
          title={trip.title}
          duration={trip.duration}
          level={trip.level}
          price={trip.price}
        />
      ))}
    </ul>
  );
};
