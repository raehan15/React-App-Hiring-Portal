// src/components/ThankYou.js
import React from "react";
import "./ThankYou.css";

const ThankYou = () => {
  return (
    <div className="thank-you">
      <div className="thank-you-box">
        <img src="/img/check.png" alt="Check Icon" className="check-icon" />{" "}
        {/* Update this path to your check icon */}
        <h2>Thank You</h2>
        <p>The form was submitted successfully.</p>
      </div>
    </div>
  );
};

export default ThankYou;
