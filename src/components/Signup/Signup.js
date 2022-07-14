import React from "react";
import { Link } from "react-router-dom";
import mainSignupImage from "../../images/signup-image.png";
import appLogo from "../../images/app-logo.png";
import googleLogo from "../../images/google-logo.png";
import facebookLogo from "../../images/facebook-logo.png";
import "./Signup.css";

export default function Signup() {
  return (
    <div className="login-container">
      <div className="login-left">
        <img className="app-logo" src={appLogo} />
        <img className="main-signup-image" src={mainSignupImage} />
      </div>
      <div className="login-right">
        <div className="login-right-contents">
          <h1 className="span-two">Sign up</h1>
          <p className="signup-text">
            If you are already a member you can log in with your email address
            and password.
          </p>
          <form className="auth-form">
            <button className="account-button">
              <img src={googleLogo} />
              Google Account
            </button>
            <button className="account-button">
              <img src={facebookLogo} />
              Facebook Account
            </button>
            <div className="divider">
              <p>Or</p>
            </div>
            <div className="form-element span-two">
              <label htmlFor="email">Email address</label>
              <input className="span-two"></input>
            </div>
            <div className="form-element span-two">
              <label htmlFor="password">Password</label>
              <input className="span-two"></input>
            </div>

            <button className="signup-button span-two">Sign up</button>
          </form>
          <p className="sign-up">
            Already have an account?&nbsp;
            <Link to="/signup">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
