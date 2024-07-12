import { ChangeEvent, useState } from "react";

type UseInput = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useInput = (initialValue: string): UseInput => {
  const [value, setValue] = useState<string>(initialValue);
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return { value, onChange };
};
