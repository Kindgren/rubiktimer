import React, { useState, useEffect, useRef } from 'react';
import Timer from '../atom/Timer';
import Button from '../atom/Button';
import './RubiksCubeTimer.css';


/**
 * The RubiksCubeTimer component represents the timer functionality for the Rubik's Cube.
 * It displays a timer, start/stop and reset buttons, and handles timer actions.
 *
 * It manages the state for time, elapsedTime, timerInterval, and isRunning.
 * It provides event handlers for handling timer actions such as starting, stopping, and resetting the timer.
 *
 * The component uses the Timer component to display the current time,
 * and the Button component for the start/stop and reset buttons.
 */


const RubiksCubeTimer = ({ onNewTime, onResetAverageTime, setIsTimerRunning }) => {
  // State variables for managing time, elapsedTime, timerInterval, and isRunning
  const [time, setTime] = useState('00:00');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // useRef for storing the timer action handler
  const handleTimerActionRef = useRef();

  // Event handler for handling timer actions (start/stop)
  const handleTimerAction = () => {
    if (isRunning) {
      // Timer is already running, stop it
      clearInterval(timerInterval);
      setTimerInterval(null);
      setElapsedTime(0);
      setIsRunning(false);
      setIsTimerRunning(false); // Notify the parent component that the timer has stopped
    } else {
      // Timer is not running, start it
      const startTime = Date.now() - elapsedTime;
      setTimerInterval(
        setInterval(() => {
          const currentTime = Date.now();
          const newElapsedTime = currentTime - startTime;
          setTime(formatTime(newElapsedTime));
          setElapsedTime(newElapsedTime);

          // Call the onNewTime function to notify the parent component of the new time
          onNewTime && onNewTime(newElapsedTime);
        }, 10)
      );
      setIsRunning(true);
      setIsTimerRunning(true); // Notify the parent component that the timer has started
    }
  };

  // Store the timer action handler in the useRef
  handleTimerActionRef.current = handleTimerAction;

  // Event handler for handling reset click
  const handleResetClick = () => {
    // Stop the timer and reset the state
    clearInterval(timerInterval);
    setTimerInterval(null);
    setElapsedTime(0);
    setTime(formatTime(0));
    setIsRunning(false);
    onResetAverageTime && onResetAverageTime();
  };

  // Helper function to format the time
  const formatTime = (time) => {
    const seconds = time / 1000;
    return seconds.toFixed(2);
  };

  // useEffect for handling keydown event
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
      {/* Timer component */}
      <Timer time={time} />

      <div className="start-stop-container">
        {/* Start/stop button */}
        <Button text={isRunning ? 'Stop' : 'Start'} onClick={handleTimerAction} />

        {/* Reset button */}
        <Button text="Reset" onClick={handleResetClick} />
      </div>
    </div>
  );
};

export default RubiksCubeTimer;
