import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignInput } from "../components/SignInput";
import { useInput } from "../hooks/useInput";
import { isEmail, isValidPassword } from "../helpers/validation";
import { RootState, useAppDispatch } from "../store/store";
import { authUser, Status } from "../store/slices/userSlice";
import { useSelector } from "react-redux";

export const SignUpPage = () => {
  const fullNameInput = useInput("");
  const emailInput = useInput("");
  const passwordInput = useInput("");

  const checkFieldsValid = (): boolean => {
    const fullName: boolean = fullNameInput.value.length > 0;
    const email: boolean = isEmail(emailInput.value);
    const password: boolean = isValidPassword(passwordInput.value);

    return fullName && email && password;
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useSelector<RootState, string>((state) => state.user.status);
  status === Status.RESOLVED && navigate("/");

  const onSubmit = () => {
    checkFieldsValid() &&
      dispatch(
        authUser({
          fullName: fullNameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
        })
      );
  };

  return (
    <main className="sign-up-page">
      <h1 className="visually-hidden">Travel App</h1>
      <form className="sign-up-form" autoComplete="off">
        <h2 className="sign-up-form__title">Sign Up</h2>
        <SignInput
          title={"Full name"}
          id="auth-full-name"
          name="full-name"
          type="text"
          {...fullNameInput}
        />
        <SignInput
          title={"Email"}
          id="auth-email"
          name="email"
          type="email"
          {...emailInput}
        />
        <SignInput
          title={"Password"}
          id="auth-password"
          name="password"
          type="password"
          autoComlete="new-password"
          {...passwordInput}
        />
        <button
          data-test-id="auth-submit"
          className="button"
          type="button"
          onClick={onSubmit}
        >
          Sign Up
        </button>
      </form>
      <span>
        Already have an account?
        <Link
          data-test-id="auth-sign-in-link"
          to="/sign-in"
          className="sign-up-form__link"
        >
          Sign In
        </Link>
      </span>
    </main>
  );
};
