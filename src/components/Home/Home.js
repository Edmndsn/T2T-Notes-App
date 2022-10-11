import React from "react";
import homeImage from "../../images/home.svg";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h2>Welcome to the Text to Typescript Note-App</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu
          dui. Lorem ipsum dolor sit amet, consectetur adipisce placerat mauris
          nisl. Proin vitae urna eu sem{" "}
          <span className="highlight">pellentesque</span> laoreet.{" "}
        </p>
        <img src={homeImage} className="home-media" alt="home" />
        <button
          className="navto-notes-button"
          onClick={() => navigate("/notes")}
        >
          Open Notes
        </button>
      </div>
    </div>
  );
}
