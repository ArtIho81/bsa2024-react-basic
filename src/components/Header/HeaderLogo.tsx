import React from "react";
import { Link } from "react-router-dom";

export const HeaderLogo = () => {
  return (
    <Link data-test-id="header-logo" to="/" className="header__logo">
      Travel App
    </Link>
  );
};
