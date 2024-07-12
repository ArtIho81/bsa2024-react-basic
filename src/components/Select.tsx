import { ChangeEvent } from "react";

type SelectProps = {
  name: string;
  values: { [key: string]: string }[];
  selected: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export const Select: React.FC<SelectProps> = ({
  name,
  values,
  selected,
  onChange,
}) => {
  return (
    <label className="select">
      <span className="visually-hidden">Search by {name}</span>
      <select
        data-test-id={`filter-${name}`}
        name={name}
        value={selected}
        onChange={onChange}
      >
        {values.map((obj) => {
          const [key, value] = Object.entries(obj)[0];
          return (
            <option key={key} value={key}>
              {value}
            </option>
          );
        })}
      </select>
    </label>
  );
};
