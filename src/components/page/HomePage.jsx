import React, { useState, useEffect } from 'react';
import RubiksCubeTimer from '../organism/RubiksCubeTimer';
import Navbar from '../organism/Navbar';
import './HomePage.css';
import AverageTime from '../organism/AverageTimes';
import RubikImage from '../../utils/rubik.png';
import HighScores from '../organism/HighScores';

const HomePage = () => {
  const [times, setTimes] = useState([]);
  const [showHighScores, setShowHighScores] = useState(false);
  const [isTimesOpen, setIsTimesOpen] = useState(false); 
  const [highscores, setHighscores] = useState(JSON.parse(localStorage.getItem('highscores')) || []);
  const [isTimerRunning, setIsTimerRunning] = useState(false); // state for timer status

  useEffect(() => {
    localStorage.setItem('highscores', JSON.stringify(highscores)); 
  }, [highscores]);

  const handleNewTime = (time) => {
    setTimes([...times, time]);
    if(times.length >=3)
    {
        handleResetAverageTime();
     
    }
    setIsTimesOpen(true);
  };
  
    const handleHighScoresClick = () => {
    setShowHighScores(!showHighScores);
  };


  const handleResetAverageTime = () => {
    setTimes([]);
    setIsTimesOpen(false); 
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
        <Navbar handleHighScoresClick={handleHighScoresClick} 
        setShowHighScores={setShowHighScores} />

       
        <div className={`high-scores-container ${showHighScores ? 'show' : ''}`}>
  <HighScores scores={highscores} />
</div>
      </div>
      <div class="rubiks-cube-container">
  <div class="rubiks-cube">
    <div class="face front"></div>
    <div class="face back"></div>
    <div class="face top"></div>
    <div class="face bottom"></div>
    <div class="face left"></div>
    <div class="face right"></div>
  </div>
</div>
      <div className="content-container">
        <div className="timer-container">
          <RubiksCubeTimer
            onNewTime={handleNewTime}
            onResetAverageTime={handleResetAverageTime}
            setIsTimerRunning={setIsTimerRunning} // pass the function to set timer status
          />
        </div>
        <div className={`last-times-container ${isTimesOpen ? 'open' : ''}`}>
          <AverageTime times={times} onNewAverage={handleNewHighscore} isTimerRunning={isTimerRunning} /> {/* pass down isTimerRunning */}
          
        </div>
       
      </div>
      
    </div>
  );
};

export default HomePage;
