import React, { Component } from 'react';
import axios from 'axios';
import '../style/Home.scss';
import loadingGif from '../img/loading.gif';

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
      maps: [],
    };
    this.node = React.createRef();
  }

  componentDidMount() {
    this.getMaps();
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  getMaps = () => {
    const userId = '5d2726fec69da05f6d156078';
    axios.get(`http://localhost:3030/${userId}/maps`)
      .then(response => this.setState({ maps: response.data }))
      .catch((error) => console.log('AXIOS ERROR!', error));
  };

  handleClick = (e) => {
    if (this.state.selectedTab === 'search' && !this.node.current.contains(e.target)) {
      this.resetSelectedTab();
    }
  };

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
      this.toggleLoading(false);
    };

    const error = () => {
      this.toggleLoading(false);
      console.log('Unable to retrieve your location');
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 60000,
      maximumAge: 60000,
    };

    if (!navigator.geolocation) {
      this.toggleLoading(false);
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
          onToggleLoading={this.toggleLoading}
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
                someRef={this.node}
                onSearchLocation={this.handleSearchLocation}
                onLoading={this.toggleLoading}
                onResetSelectedTab={this.resetSelectedTab}
              />
            )
          }
          {selectedTab === 'weather' && <Weather />}
          {selectedTab === 'metrics' && <Metrics />}
          {selectedTab === 'saved' && <Saved {...this.props}/>}
          {selectedTab === 'create-new' && <CreateNew />}
          {loading && <div className="loading-gif"><img src={loadingGif} /></div>}
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
