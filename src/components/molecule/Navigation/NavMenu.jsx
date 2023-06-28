import React from 'react';
import NavLinks from './NavLinks';
import './NavMenu.css';

const NavMenu = ({ isOpen, onHighScoresClick, clearHighScores  }) => {
    const menuClasses = `nav-menu ${isOpen ? 'open' : ''}`;
    
    return (
      <div className={menuClasses} id="menu">
        {/* Pass onHighScoresClick prop and isOpen state */}
        <NavLinks onHighScoresClick={onHighScoresClick}
        clearHighScores = {clearHighScores}
        isOpen={isOpen} />
      </div>
    );
  };
  

  

export default NavMenu;
