import React from 'react';
import './ToggleButton.css';

const ToggleButton = ({ isOpen, toggleNav }) => {
  return (
    <button onClick={toggleNav} className={`hamburger hamburger--squeeze ${isOpen ? "is-active" : ""}`} type="button">
      <span className="hamburger-box">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  );
};

export default ToggleButton;
