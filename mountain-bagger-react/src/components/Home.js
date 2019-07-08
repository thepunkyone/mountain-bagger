import React, { Component } from 'react';
import '../style/Home.scss';

import LocationNav from './LocationNav';
import SearchBox from './SearchBox';
import UserNav from './UserNav';
import ToolsNav from './ToolsNav';
import Weather from './Weather';
import Metrics from './Metrics';
import Saved from './Saved';
import CreateNew from './CreateNew';
import MapContainer from './MapContainer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      loading: false,
      gpsLongitude: '',
      gpsLatitude: '',
      locationFocus: '',
      gpsSpeed: '',
      gpsAltitude: '',
      gpsHeading: '',
      locationWatchId: null,
      searchLocationCoords: '',
    };
  }

  handleSearchLocation = (locationCoords) => {
    this.setState({ searchLocationCoords: locationCoords });
  };

  resetSelectedTab = () => {
    this.setState({ selectedTab: 'home' });
  };

  selectTab = (e) => {
    e.preventDefault();
    const selectedId = e.target.id;
    this.setState({ selectedTab: selectedId });
  };

  setLocationFocus = (string) => {
    this.setState({ locationFocus: string });
  };

  stopWatchingLocation = () => {
    navigator.geolocation.clearWatch(this.state.locationWatchId);
    this.setState({ gpsLongitude: '', gpsLatitude: '', locationWatchId: null });
  };

  toggleLoading = (boolean) => {
    this.setState({ loading: boolean });
  };

  watchUserLocation = () => {
    const success = (position) => {
      const { latitude, longitude, speed, altitude, heading } = position.coords;
      this.setState({
        gpsLongitude: longitude,
        gpsLatitude: latitude,
        gpsSpeed: speed,
        gpsAltitude: altitude,
        gpsHeading: heading,
      });
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
    const {
      selectedTab,
      locationFocus,
      loading,
      gpsLongitude,
      gpsLatitude,
      locationWatchId,
      searchLocationCoords,
    } = this.state;

    return (
      <div className="Home">
        <UserNav />
        <LocationNav
          handleClick={this.selectTab}
          locationWatchId={locationWatchId}
          onWatchUserLocation={this.watchUserLocation}
          onStopWatchingLocation={this.stopWatchingLocation}
          onLocationFocus={this.setLocationFocus}
        />
        <div className="content">
          <div>
            <MapContainer
              userId={this.props.id}
              selectedTab={selectedTab}
              locationFocus={locationFocus}
              gpsLongitude={gpsLongitude}
              gpsLatitude={gpsLatitude}
              searchLocationCoords={searchLocationCoords}
              onToggleLoading={this.toggleLoading}
            />
          </div>
          {selectedTab === 'search' &&
            (
              <SearchBox
                onSearchLocation={this.handleSearchLocation}
                onLoading={this.toggleLoading}
                onResetSelectedTab={this.resetSelectedTab}
              />
            )
          }
          {selectedTab === 'weather' && <Weather />}
          {selectedTab === 'metrics' && <Metrics />}
          {selectedTab === 'saved' && <Saved />}
          {selectedTab === 'create-new' && <CreateNew />}
          {loading && <div className="loading-animation"><div className="lds-ripple"><div /><div /></div></div>}
        </div>
        <ToolsNav
          handleClick={this.selectTab}
          selectedTab={selectedTab}
        />
      </div>
    );
  }
}

export default Home;
