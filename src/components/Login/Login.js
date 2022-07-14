import React from "react";
import { Link } from "react-router-dom";
import mainLoginImage from "../../images/login-image.png";
import appLogo from "../../images/app-logo.png";
import googleLogo from "../../images/google-logo.png";
import facebookLogo from "../../images/facebook-logo.png";
import "./Login.css";

export default function Login() {
  return (
    <div className="login-container">
      <div className="login-left">
        <img className="app-logo" src={appLogo} />
        <img className="main-login-image" src={mainLoginImage} />
      </div>
      <div className="login-right">
        <div className="login-right-contents">
          <h1 className="span-two">Account Login</h1>
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

            <button className="login-button span-two">Login</button>
          </form>
          <p className="sign-up">
            Don't have an account?&nbsp;<Link to="/signup">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
