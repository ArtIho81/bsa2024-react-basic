import React, { FormEventHandler, MouseEventHandler } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignInput } from "../components/SignInput";
import { useInput } from "../hooks/useInput";
import { isEmail, isValidPassword } from "../helpers/validation";

export const SignInPage = () => {
  const emailInput = useInput("");
  const passwordInput = useInput("");

  const checkFieldsValid = (): boolean => {
    const email: boolean = isEmail(emailInput.value);
    const password: boolean = isValidPassword(passwordInput.value);

    return email && password;
  };
  const navigate = useNavigate();

  const onSubmit = () => {
    checkFieldsValid() && navigate("/");
  };

  return (
    <main className="sign-in-page">
      <h1 className="visually-hidden">Travel App</h1>
      <form className="sign-in-form" autoComplete="off">
        <h2 className="sign-in-form__title">Sign In</h2>
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
          Sign In
        </button>
      </form>
      <span>
        Don't have an account?
        <Link
          data-test-id="auth-sign-up-link"
          to="/sign-up"
          className="sign-in-form__link"
        >
          Sign Up
        </Link>
      </span>
    </main>
  );
};
