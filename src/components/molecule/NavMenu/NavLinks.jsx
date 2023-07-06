import React, { useState } from 'react';
import Button from '../../atom/Button/Button';


const NavLinks = ({ onHighScoresClick , clearHighScores }) => {
  const handleHighScoresClick = () => {
    onHighScoresClick(); // Call the provided onHighScoresClick callback
  };

  return (
    <div className="text-sm lg:flex-grow">
    <Button text="My Highscores" onClick={handleHighScoresClick} />
  
    <Button text="Reset Highscores" onClick={clearHighScores} />
    </div>
  );
};

export default NavLinks;



