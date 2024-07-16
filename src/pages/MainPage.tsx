import React, { ChangeEvent, useEffect, useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { TripList } from "../components/TripList";
import { Level } from "../components/TripCard";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

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

export type Searches = {
  search: string;
  duration: string;
  level: string;
};

export const MainPage = () => {
  const initialState = {
    search: "",
    duration: "",
    level: "",
  };
  const [searches, setSearches] = useState<Searches>(initialState);
  const changeSearches = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: keyof Searches
  ) => setSearches({ ...searches, [type]: event.target.value });
  
  const status = useSelector<RootState, string>((state) => state.trips.status);


  return (
    <main>
      <SearchBar
        {...searches}
        onChange = {changeSearches}  
      />
      <section className="trips">
        <h2 className="visually-hidden">Trips List</h2>
        <TripList {...searches} />
      </section>
    </main>
  );
};
