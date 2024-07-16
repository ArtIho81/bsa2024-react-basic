import React, { useEffect } from "react";
import { TripCard } from "./TripCard";
import { Trip } from "../pages/MainPage";
import { RootState, useAppDispatch } from "../store/store";
import { getTrips } from "../store/slices/tripSlice";
import { useSelector } from "react-redux";

type TripListProps = {
  search: string;
  duration: string;
  level: string;
};

export const TripList: React.FC<TripListProps> = (props) => {
  const { search, duration, level } = props;

  const dispatch = useAppDispatch();

  const getDuration = (str: string, duration: number): boolean => {
    const [min, max] = str.split("_x_");
    return max ? duration > +min && duration <= +max : duration > +min;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    token && dispatch(getTrips());
  }, []);

  const trips = useSelector<RootState, Trip[]>(
    (state) => state.trips.trips
  ).filter(
    (trip) =>
      trip.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) &&
      (level === "" || level === trip.level) &&
      (duration === "" || getDuration(duration, trip.duration))
  );

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
