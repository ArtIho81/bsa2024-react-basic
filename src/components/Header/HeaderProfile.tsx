import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { RootState, useAppDispatch } from "../../store/store";
import { getUser, signOut, User } from "../../store/slices/userSlice";

export const HeaderProfile = () => {
  const dispatch = useAppDispatch();
  const user = useSelector<RootState, User>((state) => state.user.user);

  useEffect(() => {
    localStorage.getItem("token") && dispatch(getUser());
  }, []);

  return (
    <div
      data-test-id="header-profile-nav"
      className="nav-header__inner profile-nav"
      //   tabIndex='0'
    >
      <span className="visually-hidden">Profile</span>
      <img src="./src/assets/user.svg" alt="profile" />
      <ul data-test-id="header-profile-nav-list" className="profile-nav__list">
        <li
          data-test-id="header-profile-nav-username"
          className="profile-nav__item"
        >
          {user?.fullName}
        </li>
        <li className="profile-nav__item">
          <Link
            data-test-id="header-profile-nav-sign-out"
            to="/sign-in"
            className="profile-nav__sign-out button"
            onClick={() => dispatch(signOut())}
          >
            Sign Out
          </Link>
        </li>
      </ul>
    </div>
  );
};
