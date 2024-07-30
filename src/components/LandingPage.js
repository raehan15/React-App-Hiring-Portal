// src/components/LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path, domain) => {
    localStorage.setItem("selectedDomain", domain);
    navigate(path);
  };

  return (
    <div className="landing-page">
      <div className="options">
        <div
          className="option"
          onClick={() =>
            handleNavigation("/user/resume-upload", "UI/UX Design")
          }
        >
          <img src="/img/UI.png" alt="Icon 1" />
          <p>UI/UX DESIGN</p>
        </div>
        <div
          className="option"
          onClick={() =>
            handleNavigation("/user/resume-upload", "Front-end Developer")
          }
        >
          <img src="/img/front-end.png" alt="Icon 2" />
          <p>FRONT-END DEVELOPER</p>
        </div>
        <div
          className="option"
          onClick={() =>
            handleNavigation("/user/resume-upload", "Full-stack Developer")
          }
        >
          <img src="/img/full-stack.png" alt="Icon 3" />
          <p>FULL-STACK DEVELOPER</p>
        </div>
        <div
          className="option"
          onClick={() =>
            handleNavigation("/user/resume-upload", "IOS Developer")
          }
        >
          <img src="/img/ios.png" alt="Icon 4" />
          <p>IOS DEVELOPER</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
