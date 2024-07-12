export const isEmail = (email: string): boolean => {
  return !!email && email.includes("@");
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 3 && password.length <= 20;
};

export const isDateValid = (date: string): boolean => {
  const today = new Date().toISOString().split("T")[0];
  return +date.replaceAll("-", "") - +today.replaceAll("-", "") >= 1;
};

export const isGuestsValid = (guests: number): boolean => {
  const min = 1;
  const max = 10;
  return guests >= min && guests <= max;
};
