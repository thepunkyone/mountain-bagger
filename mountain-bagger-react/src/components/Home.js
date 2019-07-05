import React, { Component } from 'react';
import '../style/Home.scss';
import Logo from './Logo';
import ToolsNav from './ToolsNav';
import Weather from './Weather';
import Metrics from './Metrics';
import Saved from './Saved';
import CreateNew from './CreateNew';
import Map from './Map';

import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import ExploreIcon from '@material-ui/icons/Explore';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import GpsNotFixedIcon from '@material-ui/icons/GpsNotFixed';
import SearchIcon from '@material-ui/icons/Search';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

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

const downloadIconStyle = {
  ...menuIconStyle,
  filter: 'drop-shadow(1px 1px 2px #222222)',
};

const menuIconLightStyle = {
  width: '42px',
  height: '42px',
  color: '#888888',
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      lng: -3.2116,
      lat: 54.4542,
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
    this.setState({ lng: -3.2116, lat: 54.4542, locationWatchId: null });
  };

  watchUserLocation = () => {
    const success = (position) => {
      const { latitude, longitude, speed, altitude, heading } = position.coords;
      this.setState({ lng: longitude, lat: latitude });
    };

    const error = () => {
      alert('Unable to retrieve your location');
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
    console.log(this.state);
    const { selectedTab } = this.state;
    return (
      <div className="Home">
        <nav className="UserNav nav-main">
          <MenuIcon style={{ ...menuIconStyle, cursor: 'pointer' }} />
          <h2>
            <Logo iconStyle={logoIconStyle} />
          </h2>
          <SettingsIcon style={{ ...menuIconStyle, cursor: 'pointer' }} />
        </nav>
        <nav className="LocationNav nav-main">
          <div className="nav-metrics">
            <p className="menu-icon-light">
              <span>
                Altitude
              </span>
              <span>
                156m
              </span>
            </p>
            <p className="menu-icon-light">
              <span>
                Speed
              </span>
              <span>
                2km/h
              </span>
            </p>
            <ExploreIcon style={menuIconLightStyle} />
          </div>
          {this.state.locationWatchId === null ?
            (
              <GpsNotFixedIcon
                style={{ ...menuIconStyle, cursor: 'pointer' }}
                onClick={() => this.watchUserLocation()}
              />
            )
            :
            (
              <GpsFixedIcon
                style={{ ...menuIconStyle, cursor: 'pointer' }}
                onClick={() => this.stopWatchingLocation()}
              />
            )
          }
          <SearchIcon style={{ ...menuIconStyle, cursor: 'pointer' }} />
        </nav>
        <div className="content">
          <div>
            <Map />
            <span>
              <CloudDownloadIcon style={{ ...downloadIconStyle, cursor: 'pointer' }} />
            </span>
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
