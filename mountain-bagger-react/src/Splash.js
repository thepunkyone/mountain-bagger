import React, { Component } from 'react';
import './style/Splash.scss';
import Carousel from 'react-carousel';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollStepDistance: 3,
      visibleIndex: 0,
    };
  }

  handleScrollToIndex = (index) => {
    this.setState({
      visibleIndex: index,
    });
  };

  render() {
    return (
      <div className="Splash">
        <h1>Welcome to MountainBagger</h1>
        <button>Sign in</button>
        <button>Register</button>
        <Carousel>
          controlWidth={25}
          firstVisibleIndex={this.state.visibleIndex}
          itemMargin={10}
          itemWidth={50}
          onItemScroll={this.handleScrollToIndex}
          scrollStepDistance={this.state.scrollStepDistance}

          <div key="0" className="_add-box">
            Find your way with hi-res terrain maps and GPS tracker.
          </div>
          <div key="1" className="_add-box">
            Get off the beaten path with custom routes and maps for offline use.
          </div>
          <div key="2" className="_add-box">
            Share your stats with real-time recording and detailed metrics.
          </div>
        </Carousel>
        <h3>MountainBagger<br />Climb every mountain.</h3>
      </div>
    );
  }
}

export default Splash;
