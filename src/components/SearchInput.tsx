import React, { ChangeEvent } from "react";

type InputProps = {
  name: string;
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInput: React.FC<InputProps> = ({
  name,
  type,
  value,
  onChange,
}) => {
  return (
    <label className="trips-filter__search input">
      <span className="visually-hidden">Search by name</span>
      <input
        data-test-id={`filter-${name}}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder="search by title"
      />
    </label>
  );
};
