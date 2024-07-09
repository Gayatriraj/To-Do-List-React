import React from "react";
import "./css/LandingPage.css";
import stickyNoteImage from "./images/image1.jpeg"; 

const LandingPage = ({ showTodoList }) => {
  return (
    <div className="landing-page">
      <h1 className="landing-title">Organize Your Tasks</h1>
      <button className="get-started-btn" onClick={showTodoList}>
        Get Started
      </button>
      <img
        src={stickyNoteImage}
        alt="Sticky Note"
        className="sticky-note-landing sticky-note-landing"
      />
    </div>
  );
};

export default LandingPage;
