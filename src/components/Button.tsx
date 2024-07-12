import React from "react";

type ButtonProps = {
  title: string;
  className?: string;
  id: string;
  type?: "button" | "submit" | "reset";
  onClick: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  className,
  id,
  type,
  onClick,
}) => {
  return (
    <button
      data-test-id={id}
      className={className ? `${className} button` : "button"}
      type={type}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
