import React from 'react';
import './Timebox.css'

const HighScores = ({ scores }) => {

    const formatTime = (time) => {
        const seconds = time % 1000; 
        return `${seconds.toString().padStart(3, '0')}`;
      };
      

  return (
    <div className="time-container">
     <h1 style={{ fontSize: '24px' }}>High Scores</h1>
    <ol className="time-list">
      {scores.map((score, index) => (
        <li key={index} className="time">
         {index+1}. {formatTime(score)}
        </li>
      ))}
    </ol>
  </div>
);
};

export default HighScores;
