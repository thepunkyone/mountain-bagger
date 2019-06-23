import React, { Component } from 'react';
import './style/Splash.scss';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const Slider = () => {
  return (
    <AwesomeSlider>
      <div className="_add-box">
         Find your way with hi-res terrain maps and GPS tracker.
      </div>
      <div className="_add-box">
        Get off the beaten path with custom routes and maps for offline use.
      </div>
      <div className="_add-box">
        Share your stats with real-time route recording and detailed metrics.
      </div>
    </AwesomeSlider>
  );
};

const Splash = () => {
  return (
    <div className="Splash">
      <h1>Welcome to MountainBagger</h1>
      <button className="_action">Sign in</button>
      <button className="_action">Register</button>
      <Slider />
      <h3>MountainBagger<br />Climb every mountain.</h3>
    </div>
  );
};

export default Splash;
