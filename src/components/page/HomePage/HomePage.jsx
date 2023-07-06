import React, { useState, useEffect } from 'react';
import RubiksCubeTimer from '../../organism/RubiksCubeTimer/RubiksCubeTimer';
import Navbar from '../../organism/Navbar/Navbar';
import './HomePage.css';
import AverageTime from '../../molecule/AverageTimes';
import HighScores from '../../molecule/HighScores';
import RubikAnimation from '../../atom/RubikAnimation/RubikAnimation';

const HomePage = () => {
  const [times, setTimes] = useState([]);
  const [showHighScores, setShowHighScores] = useState(false);
  const [isTimesOpen, setIsTimesOpen] = useState(false); 
  const [highscores, setHighscores] = useState(JSON.parse(localStorage.getItem('highscores')) || []);
  const [isTimerRunning, setIsTimerRunning] = useState(false); // state for timer status
  const [isMobile, setIsMobile] = useState(false);
  const [timerIsFull, setTimerIsFull] = useState(false);

  useEffect(() => {
    localStorage.setItem('highscores', JSON.stringify(highscores)); 
  }, [highscores]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  const handleNewTime = (time) => {
    
    if (times.length >= 3) {
    
      setTimerIsFull(true);
      handleResetAverageTime();
      setIsTimesOpen(false);

    }else
    {
      setTimes([...times, time]);
      setIsTimesOpen(true);
    }
  
  
  };

  const clearHighScores = () => {
    localStorage.removeItem('highscores');
    setHighscores([]);
  };
  
  const handleHighScoresClick = () => {
    setShowHighScores(!showHighScores);
  };

  const handleResetAverageTime = () => {
   
    setIsTimesOpen(false);
    setTimerIsFull(false); // Reset timerIsFull state
    
    setTimeout(() => {
      setTimes([]);
    }, 500);
    
    
  };

  const handleNewHighscore = (score) => {
    if (highscores.length < 3 || score < highscores[highscores.length - 1]) {
      let newHighscores = [...highscores, score];
      newHighscores.sort((a, b) => a - b);
      newHighscores = newHighscores.slice(0, 3);
      setHighscores(newHighscores);
    }
  };

  return (
    <div className="home-page">
      <div className="nav-bar">
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
        {!isMobile && <RubikAnimation />}
      </div>
      <div className="content-container">
        <div className="timer-container">
          <RubiksCubeTimer
            onNewTime={handleNewTime}
            onResetAverageTime={handleResetAverageTime}
            setIsTimerRunning={setIsTimerRunning}
            timerIsFull={timerIsFull} 
          />
        </div>
        <div className={`last-times-container ${isTimesOpen && (!showHighScores && isMobile)? 'open' : ''}`}>
          <AverageTime
            times={times}
            onNewAverage={handleNewHighscore}
            isTimerRunning={isTimerRunning}
          />
        </div>
        <div className={`last-times-container ${isTimesOpen && !isMobile ? 'open' : ''}`}>
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
