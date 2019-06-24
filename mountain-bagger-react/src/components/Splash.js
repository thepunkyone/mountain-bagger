import React from 'react';
import '../style/Splash.scss';
import WelcomeHeader from './WelcomeHeader';
import Slider from './Slider';

const Splash = () => {
  return (
    <div className="Splash">
      <WelcomeHeader />
      <button className="_action">Sign in</button>
      <button className="_action _outlined _transparent">Register</button>
      <Slider />
      <button className="_action _outlined _slider-button">Get started</button>
      <h3 className="_tagline">
        MountainBagger
        <br />
        Climb every mountain.
      </h3>
    </div>
  );
};

export default Splash;
