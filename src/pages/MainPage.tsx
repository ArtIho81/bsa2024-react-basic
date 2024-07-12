import React, { ChangeEvent, useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { TripList } from "../components/TripList";
import allTrips from "../data/trips.json";
import { Level } from "../components/TripCard";

export type Trip = {
  id: string;
  title: string;
  description: string;
  level: Level;
  duration: number;
  price: number;
  image: string;
  createdAt: string;
};

const getDuration = (str: string, duration: number): boolean => {
  const [min, max] = str.split("_x_");
  return max ? duration > +min && duration <= +max : duration > +min;
};

export const MainPage = () => {
  const [search, setSearch] = useState("");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("");
  const [trips, setTrips] = useState<Trip[]>([]);

  const changeState = {
    onSearch: (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    onDuration: (event: ChangeEvent<HTMLSelectElement>) => {
      setDuration(event.target.value);
    },
    onLevel: (event: ChangeEvent<HTMLSelectElement>) => {
      setLevel(event.target.value);
    },
  };

  useEffect(() => {
    const trips = allTrips.filter(
      (trip) =>
        trip.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) &&
        (level === "" || level === trip.level) &&
        (duration === "" || getDuration(duration, trip.duration))
    );
    setTrips(trips as Trip[]);
  }, [search, duration, level]);

  return (
    <main>
      <SearchBar
        search={search}
        duration={duration}
        level={level}
        {...changeState}
      />
      <section className="trips">
        <h2 className="visually-hidden">Trips List</h2>
        <TripList trips={trips} />
      </section>
    </main>
  );
};
