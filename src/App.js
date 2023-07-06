import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // import Route and Routes
import HomePage from './components/page/HomePage/HomePage';
import './App.css';
import RubikImage from './utils/rubik.png';

const App = () => {
  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url(${RubikImage})`,
        backgroundSize: '30%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top 100px',
        backgroundColor: 'black',
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
