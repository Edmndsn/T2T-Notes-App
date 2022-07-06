import React from "react";
import homeImage from "../../images/home-image.png";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h2>Welcome to the Best Note-App</h2>
        <h5>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at arcu
          dui. Lorem ipsum dolor sit amet, consectetur adipisce placerat mauris
          nisl. Proin vitae urna eu sem pellentesque laoreet.
        </h5>
        <img src={homeImage} alt="home-image" />
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

export default Home;
