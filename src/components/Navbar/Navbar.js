import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import appLogo from "../../images/app-logo.png";
import "./Navbar.css";
import { useAuth } from "../Context/AuthContext";
export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    setErrorMessage("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setErrorMessage("Log out failed");
    }
  }
  console.log(currentUser);
  return (
    // <div className="nav-container">
    <div className="desktop-version">
      <nav>
        <div className="logo-container">
          <img className="logo" src={appLogo} alt="app-logo" />
        </div>
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/notes">Notes</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
      </nav>
      <button className="logout-button" onClick={handleSubmit}>
        Log out
      </button>
    </div>
    // </div>
  );
}
