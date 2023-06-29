import React, { useState, useEffect } from 'react';
import RubiksCubeTimer from '../organism/RubiksCubeTimer';
import Navbar from '../organism/Navbar';
import './HomePage.css';
import AverageTime from '../molecule/AverageTimes';
import HighScores from '../molecule/HighScores';

/**
 * The HomePage component represents the home page of the application.
 * It displays the navigation bar, the Rubik's Cube, the timer functionality,
 * and the display of last times and average time.
 *
 * It manages the state for times, showHighScores, isTimesOpen, highscores, and isTimerRunning.
 * It provides event handlers for handling new time, resetting average time, updating high scores,
 * and toggling the visibility of high scores.
 *
 * The component uses the RubiksCubeTimer component for timer functionality,
 * the AverageTime component to display last times and average time,
 * and the HighScores component to display the high scores.
 */


const HomePage = () => {
  const [times, setTimes] = useState([]);
  const [showHighScores, setShowHighScores] = useState(false);
  const [isTimesOpen, setIsTimesOpen] = useState(false); 
  const [highscores, setHighscores] = useState(JSON.parse(localStorage.getItem('highscores')) || []);
  const [isTimerRunning, setIsTimerRunning] = useState(false); // state for timer status
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    localStorage.setItem('highscores', JSON.stringify(highscores)); 
  }, [highscores]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    // Attach the event listener to the window resize event
  window.addEventListener('resize', handleResize);

  // Call the handler once on initial render
  handleResize();

  // Clean up the event listener on component unmount
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
  

  const handleNewTime = (time) => {
    setTimes([...times, time]);
    if(times.length >=3)
    {
        handleResetAverageTime();
     
    }
    setIsTimesOpen(true);
  };

  const clearHighScores = () => {
    localStorage.removeItem('highscores');
    setHighscores([]);
  };
  
    const handleHighScoresClick = () => {
    setShowHighScores(!showHighScores);
  };


  const handleResetAverageTime = () => {
    setTimes([]);
    setIsTimesOpen(false); 
  };

  const RubiksCube = () => {
    // Add your Rubik's Cube JSX code here
    return (
   
      <div className="rubiks-cube">
        <div className="face front"></div>
        <div className="face back"></div>
        <div className="face top"></div>
        <div className="face bottom"></div>
        <div className="face left"></div>
        <div className="face right"></div>
      </div>
    );
  };
  

  const handleNewHighscore = (score) => {
    // First check if this score should be added
    if (highscores.length < 3 || score < highscores[highscores.length - 1]) {
      let newHighscores = [...highscores, score]; // Add the new score
      newHighscores.sort((a, b) => a - b); // Sort the scores in ascending order
      newHighscores = newHighscores.slice(0, 3); // Keep only the top 3 scores
      setHighscores(newHighscores);
    }
  };

  return (
      <div className="home-page">
        <div className="nav-bar">
          {/* Pass the handleHighScoresClick to Navbar */}
          <Navbar
            handleHighScoresClick={handleHighScoresClick}
            setShowHighScores={setShowHighScores}
            clearHighScores={clearHighScores}
          />
          <div className={`high-scores-container ${showHighScores ? 'show' : ''}`}>
            <HighScores scores={highscores} />
          </div>
        </div>
        <div className="rubiks-cube-container">
        {!isMobile && <RubiksCube />}
        </div>
        <div className="content-container">
          <div className="timer-container">
            <RubiksCubeTimer
              onNewTime={handleNewTime}
              onResetAverageTime={handleResetAverageTime}
              setIsTimerRunning={setIsTimerRunning}
            />
          </div>
          <div className={`last-times-container ${isTimesOpen ? 'open' : ''}`}>
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
  
  export default HomePage;

