import React, { useState } from 'react';
import NavMenu from '../../molecule/NavMenu/NavMenu';
import ToggleButton from '../../atom/ToggleButton/ToggleButton';

// The Navbar component represents the header navigation bar.
// It displays a toggle button and a menu for navigating the application.
// Props:
// - handleHighScoresClick: Function to handle the high scores click event
// - setShowHighScores: Function to control the display of high scores
// - clearHighScores: Function to clear the high scores data

const Navbar = ({ handleHighScoresClick, setShowHighScores, clearHighScores }) => {
  
  // State variable for managing the open/close state of the navbar
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the navbar open/close state
  const toggleNav = () => {
    setIsOpen(!isOpen);
    setShowHighScores(false); // Close the high scores section when toggling the navbar
  };

  return (
    <header className="Togglebutton">
      {/* The Toggle Button */}
      <ToggleButton isOpen={isOpen} toggleNav={toggleNav} />

      {/* Pass the isOpen state and handleHighScoresClick prop to NavMenu */}
      <NavMenu isOpen={isOpen} onHighScoresClick={handleHighScoresClick} clearHighScores={clearHighScores} />
    </header>
  );
};

export default Navbar;
