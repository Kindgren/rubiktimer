import React from 'react';
import RubiksCubeTimer from '../atom/RubiksCubeTimer';
import AverageTime from '../molecule/AverageTimes';
import Navbar from '../organism/Navbar';
import HighScores from '../molecule/HighScores';
import './HomepageTemplate.css';

/** 
The HomePageTemplate component represents the template structure for the home page
It combines various components to create the layout and functionality of the page
*/

const HomePageTemplate = ({
  times,
  showHighScores,
  handleHighScoresClick,
  setShowHighScores,
  clearHighScores,
  handleNewTime,
  handleResetAverageTime,
  highscores,
  isTimesOpen,
  setIsTimerRunning,
  handleNewHighscore,
  isTimerRunning,
}) => {
  return (
    <div className="home-page">
      <div className="nav-bar">
        {/* Navbar component for navigation and control */}
        <Navbar
          handleHighScoresClick={handleHighScoresClick}
          setShowHighScores={setShowHighScores}
          clearHighScores={clearHighScores}
        />
        <div className={`high-scores-container ${showHighScores ? 'show' : ''}`}>
          {/* HighScores component to display high scores */}
          <HighScores scores={highscores} />
        </div>
      </div>
      <div className="rubiks-cube-container">
        <div className="rubiks-cube">
          {/* RubiksCube component to render the 3D Rubik's Cube */}
          <div className="face front"></div>
          <div className="face back"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>
          <div className="face left"></div>
          <div className="face right"></div>
        </div>
      </div>
      <div className="content-container">
        <div className="timer-container">
          {/* RubiksCubeTimer component for timer functionality */}
          <RubiksCubeTimer
            onNewTime={handleNewTime}
            onResetAverageTime={handleResetAverageTime}
            setIsTimerRunning={setIsTimerRunning}
          />
        </div>
        <div className={`last-times-container ${isTimesOpen ? 'open' : ''}`}>
          {/* AverageTime component to display last times and average time */}
          <AverageTime
            times={times}
            onNewAverage={handleNewHighscore}
            isTimerRunning={isTimerRunning}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePageTemplate;
