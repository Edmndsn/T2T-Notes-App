import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import appLogo from "../../images/app-logo.svg";
import menu from "../../images/menu.svg";
import "./Navbar.css";
import { useAuth } from "../Context/AuthContext";
export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [navSelector, setNavSelector] = useState(false);

  function handleNav(event) {
    setNavSelector(prev => !prev);
  }

  const navigate = useNavigate();

  async function handleLogout() {
    setErrorMessage("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setErrorMessage("Log out failed");
    }
  }

  return (
    <>
      <div className="desktop-version">
        <nav>
          <div className="logo-container">
            <img className="logo" src={appLogo} alt="app-logo" />
            <span>Notes App</span>
          </div>
          <div className="nav-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/notes">Notes</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
        </nav>
        <button className="logout-button" onClick={handleLogout}>
          Log out
        </button>
      </div>
      <div className="mobile-version">
        <div className="mob-header">
          <div className="logo-container">
            <img className="logo" src={appLogo} alt="app-logo" />
            <span>Notes App</span>
          </div>
          <button className="nav-hamburger" onClick={handleNav}>
            <img src={menu} />
          </button>
        </div>

        <nav className={navSelector ? "nav-links mob" : "nav-links mob-hidden"}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/notes">Notes</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <button className="logout-button" onClick={handleLogout}>
            Log out
          </button>
        </nav>
      </div>
    </>
  );
}
