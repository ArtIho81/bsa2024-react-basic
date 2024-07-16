import { Select } from "./Select";
import { SearchInput } from "./SearchInput";
import { ChangeEvent } from "react";
import { Searches } from "../pages/MainPage";

type SearchBarProps = {
  search: string;
  duration: string;
  level: string;
  onChange: (
    event: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    type: keyof Searches
  ) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  search,
  duration,
  level,
  onChange,
}) => {
  const durations: { [key: string]: string }[] = [
    { "": "duration" },
    { "0_x_5": "< 5 days" },
    { "5_x_10": "< 10 days" },
    { "10": "> 10 days" },
  ];

  const levels: { [key: string]: string }[] = [
    { "": "level" },
    { easy: "easy" },
    { moderate: "moderate" },
    { difficult: "difficult" },
  ];

  return (
    <>
      <h1 className="visually-hidden">Travel App</h1>
      <section className="trips-filter">
        <h2 className="visually-hidden">Trips filter</h2>
        <form className="trips-filter__form" autoComplete="off">
          <SearchInput
            name="search"
            type="search"
            value={search}
            onChange={(e) => onChange(e, "search")}
          />
          <Select
            name="duration"
            values={durations}
            selected={duration}
            onChange={(e) => onChange(e, "duration")}
          />
          <Select
            name="level"
            values={levels}
            selected={level}
            onChange={(e) => onChange(e, "level")}
          />
        </form>
      </section>
    </>
  );
};
