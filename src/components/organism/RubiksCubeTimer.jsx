import React, { useState, useEffect, useRef } from 'react';
import Timer from '../molecule/Timer';
import Button from '../atom/Button';
import './RubiksCubeTimer.css';

const RubiksCubeTimer = ({ onNewTime, onResetAverageTime, setIsTimerRunning }) => {
  const [time, setTime] = useState('00:00');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleTimerActionRef = useRef();

  const handleTimerAction = () => {
    if (isRunning) {
      clearInterval(timerInterval);
      setTimerInterval(null);
      setElapsedTime(0);
      setIsRunning(false);
      setIsTimerRunning(false); // Notify the parent component that the timer has stopped
    } else {
      const startTime = Date.now() - elapsedTime;
      setTimerInterval(
        setInterval(() => {
          const currentTime = Date.now();
          const newElapsedTime = currentTime - startTime;
          setTime(formatTime(newElapsedTime));
          setElapsedTime(newElapsedTime);
          
          onNewTime && onNewTime(newElapsedTime);
        }, 10)
      );
      setIsRunning(true);
      setIsTimerRunning(true); // Notify the parent component that the timer has started
    }
  };

  handleTimerActionRef.current = handleTimerAction;

  const handleResetClick = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
    setElapsedTime(0);
    setTime(formatTime(0));
    setIsRunning(false);
    onResetAverageTime && onResetAverageTime();
  };

  const formatTime = (time) => {
    const seconds = time / 1000;
    return seconds.toFixed(2); 
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        handleTimerActionRef.current && handleTimerActionRef.current();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="timer-container">
      <Timer time={time} />
      <div className="start-stop-container">
        <Button text={isRunning ? 'Stop' : 'Start'} onClick={handleTimerAction} />
        <Button text="Reset" onClick={handleResetClick} />
      </div>
    </div>
  );
};

export default RubiksCubeTimer;
