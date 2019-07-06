import React, { Component } from 'react';
import '../style/Home.scss';
import Logo from './Logo';
import LocationNav from './LocationNav';
import ToolsNav from './ToolsNav';
import Weather from './Weather';
import Metrics from './Metrics';
import Saved from './Saved';
import CreateNew from './CreateNew';
import MapContainer from './MapContainer';

import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const logoIconStyle = {
  width: '40px',
  height: '40px',
  marginBottom: '-10px',
};

const menuIconStyle = {
  width: '42px',
  height: '42px',
  padding: '5px',
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      gpsLongitude: '',
      gpsLatitude: '',
      locationWatchId: null,
    };
  }

  selectTab = (e) => {
    e.preventDefault();
    const selectedId = e.target.id;
    this.setState({ selectedTab: selectedId });
  };

  stopWatchingLocation = () => {
    navigator.geolocation.clearWatch(this.state.locationWatchId);
    this.setState({ gpsLongitude: '', gpsLatitude: '', locationWatchId: null });
  };

  watchUserLocation = () => {
    const success = (position) => {
      const { latitude, longitude, speed, altitude, heading } = position.coords;
      this.setState({ gpsLongitude: longitude, gpsLatitude: latitude });
    };

    const error = () => {
      console.log('Unable to retrieve your location');
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 60000,
      maximumAge: 60000,
    };

    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      console.log('Locating…');
      this.setState({
        locationWatchId: navigator.geolocation.watchPosition(success, error, options),
      });
    }
  };

  render() {
    const { selectedTab, locationWatchId } = this.state;

    return (
      <div className="Home">
        <nav className="UserNav nav-main">
          <MenuIcon style={{ ...menuIconStyle, cursor: 'pointer' }} />
          <h2>
            <Logo iconStyle={logoIconStyle} />
          </h2>
          <ExitToAppIcon style={{ ...menuIconStyle, cursor: 'pointer' }} />
        </nav>
        <LocationNav
          locationWatchId={locationWatchId}
          onWatchUserLocation={this.watchUserLocation}
          onStopWatchingLocation={this.stopWatchingLocation}
        />
        <div className="content">
          <div>
            <MapContainer
              userId={this.props.id}
              selectedTab={this.state.selectedTab}
              gpsLongitude={this.state.gpsLongitude}
              gpsLatitude={this.state.gpsLatitude}
            />
          </div>
          {selectedTab === 'weather' && <Weather />}
          {selectedTab === 'metrics' && <Metrics />}
          {selectedTab === 'saved' && <Saved />}
          {selectedTab === 'create-new' && <CreateNew />}
        </div>
        <ToolsNav
          handleClick={this.selectTab}
          selectedTab={this.state.selectedTab}
        />
      </div>
    );
  }
}

export default Home;
