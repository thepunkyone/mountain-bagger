import React from 'react';
import '../style/Splash.scss';
import WelcomeHeader from './WelcomeHeader';
import Slider from './Slider';

const Splash = () => {
  return (
    <div className="Splash">
      <WelcomeHeader />
      <button className="action">Sign in</button>
      <button className="action outlined transparent">Register</button>
      <Slider />
      <button className="action outlined slider-button">Get started</button>
      <h3 className="tagline">
        MountainBagger
        <br />
        Climb every mountain.
      </h3>
    </div>
  );
};

export default Splash;
