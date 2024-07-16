import React from "react";
import { Link } from "react-router-dom";
import { HeaderProfile } from "./HeaderProfile";

export const HeaderNav = () => {
  return (
    <nav data-test-id="header-nav" className="header__nav">
      <ul className="nav-header__list">
        <li className="nav-header__item" title="Bookings">
          <Link
            data-test-id="header-bookings-link"
            to="/bookings"
            className="nav-header__inner"
          >
            <span className="visually-hidden">Bookings</span>
            <img src="./src/assets/briefcase.svg" alt="bookings" />
          </Link>
        </li>
        <li className="nav-header__item" title="Profile">
          <HeaderProfile />
        </li>
      </ul>
    </nav>
  );
};
