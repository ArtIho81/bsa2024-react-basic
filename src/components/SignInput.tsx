import React, { ChangeEvent } from "react";

type SignInputProps = {
  title: string;
  name: string;
  type: string;
  id: string;
  autoComlete?: string;
  min?: string;
  max?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const SignInput: React.FC<SignInputProps> = ({
  title,
  id,
  name,
  type,
  autoComlete,
  min,
  max,
  value,
  onChange,
}) => {
  return (
    <label className="input">
      <span className="input__heading">{title}</span>
      <input
        data-test-id={id}
        name={name}
        type={type}
        autoComplete={autoComlete}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
