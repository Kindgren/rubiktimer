import React, { useState } from 'react';
import Button from '../../atom/Button';







const NavLinks = ({ onHighScoresClick }) => {
  const handleHighScoresClick = () => {
    onHighScoresClick(); // Call the provided onHighScoresClick callback
  };

  return (
    <div className="text-sm lg:flex-grow">
    <Button text="My Highscores" onClick={handleHighScoresClick} />
  
    {/* <Button text="Maybe some neat function here" /> */}
    </div>
  );
};

export default NavLinks;



