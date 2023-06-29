import React, { useEffect, useRef } from 'react';
import './Timebox.css';
import '../atom/Button.css';

const AverageTime = ({ times, onNewAverage, isTimerRunning }) => { 
  const lastThreeTimes = times.slice(Math.max(times.length - 3, 0));
  const previousAverageRef = useRef();  // useRef to keep track of the previous average

  const formatTime = (time) => {
    const seconds = time / 1000;
    return seconds.toFixed(2);
  };
  
  const calculateAverage = (timeArray) => {
    const total = timeArray.reduce((acc, curr) => acc + curr, 0);
    return formatTime(total / timeArray.length);
  }

  useEffect(() => {
    const newAverage = calculateAverage(lastThreeTimes);

    if (lastThreeTimes.length === 3 && !isTimerRunning && newAverage !== previousAverageRef.current) {
      onNewAverage(newAverage);
      previousAverageRef.current = newAverage;  // Update the previous average
    }
  }, [lastThreeTimes, onNewAverage, isTimerRunning]);

  return (
    <div className="time-container">
      <ul className="time-list">
        {lastThreeTimes.map((time, index) => (
          <li key={index} className="time-item">
            Time {index + 1}: {formatTime(time)}
          </li>
        ))}
      </ul>
      <div className="time">
        <h3>Average Time: {calculateAverage(lastThreeTimes)}</h3>
      </div>
    </div>
  );
};

export default AverageTime;
