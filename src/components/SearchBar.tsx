import { Select } from "./Select";
import { SearchInput } from "./SearchInput";
import { ChangeEvent } from "react";

type SearchBarProps = {
  search: string;
  duration: string;
  level: string;
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  onDuration: (event:ChangeEvent<HTMLSelectElement>) => void;
  onLevel: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  search,
  duration,
  level,
  onSearch,
  onDuration,
  onLevel,
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
            onChange={onSearch}
          />
          <Select
            name="duration"
            values={durations}
            selected={duration}
            onChange={onDuration}
          />
          <Select
            name="level"
            values={levels}
            selected={level}
            onChange={onLevel}
          />
        </form>
      </section>
    </>
  );
};
