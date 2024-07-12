import React from "react";
import { useLocation } from "react-router-dom";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderNav } from "./HeaderNav";

export const Header = () => {
  const location = useLocation();
  const isNav = () => {
    return location.pathname !== "/sign-in" && location.pathname !== "/sign-up";
  };
  return (
    <header className="header">
      <div className="header__inner">
        <HeaderLogo />
        {isNav() && <HeaderNav />}
      </div>
    </header>
  );
};
