import React, { useState } from 'react';
import NavMenu from '../molecule/Navigation/NavMenu';
import ToggleButton from '../atom/Navigation/ToggleButton';


const Navbar = ({ handleHighScoresClick, setShowHighScores}) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleNav = () => {
      setIsOpen(!isOpen);
      setShowHighScores(false);
      
    };
  
    return (
      <header className="Togglebutton">
        {/* Your Toggle Button */}
        <ToggleButton isOpen={isOpen} toggleNav={toggleNav} />
  
        {/* Pass the isOpen state and handleHighScoresClick prop to NavMenu */}
        <NavMenu isOpen={isOpen} onHighScoresClick={handleHighScoresClick} />
      </header>
    );
};

  
  export default Navbar;