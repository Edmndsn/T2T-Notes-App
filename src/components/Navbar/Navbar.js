import React from "react";
import { NavLink } from "react-router-dom";
import appLogo from "../../images/app-logo.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={appLogo} alt="app-logo" />
      </div>
      <div className="nav-text">
        <NavLink to="/">Home</NavLink>
        <NavLink to="notes">Notes</NavLink>
        <NavLink to="contact">Contact</NavLink>
      </div>
    </nav>
  );
}
