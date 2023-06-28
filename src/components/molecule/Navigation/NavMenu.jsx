import React from 'react';
import NavLinks from './NavLinks';
import './NavMenu.css';

const NavMenu = ({ isOpen, onHighScoresClick }) => {
    const menuClasses = `nav-menu ${isOpen ? 'open' : ''}`;
    
    return (
      <div className={menuClasses} id="menu">
        {/* Pass onHighScoresClick prop and isOpen state */}
        <NavLinks onHighScoresClick={onHighScoresClick} isOpen={isOpen} />
      </div>
    );
  };
  

  

export default NavMenu;
