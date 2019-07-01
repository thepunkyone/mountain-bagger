import React, { Component } from 'react';
import '../style/Map.scss';
import GpsFixedIcon from '../img/gps_fixed_24px.svg';

class StaticGpsLocator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: '',
      lat: '',
      locationWatchId: null,
      mapDimensions: {
        width: 600,
        height: 600,
      },
      bounds: {
        _ne: {
          lng: -1.1485704934752619,
          lat: 52.37124148955857,
        },
        _sw: {
          lng: -1.200068906558215,
          lat: 52.33978831418915,
        },
      },
    };
  }

  componentDidMount() {
    this.watchUserLocation();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.lat !== this.state.lat) {
      this.convertLocationToPx(this.state.lng, this.state.lat);
    }
  }

  convertLocationToPx = (longitudeGps, latitudeGps) => {
    const { width: mapWidth, height: mapHeight } = this.state.mapDimensions;
    const lon = longitudeGps;
    const lat = latitudeGps;

    var imageNorthLat = this.state.bounds._ne.lat;  // Latitude of the image's northern edge
    var imageSouthLat = this.state.bounds._sw.lat;  // Latitude of the image's southern edge

    var imageWestLong = this.state.bounds._sw.lng; // Longitude of the image's western edge
    var imageEastLong = this.state.bounds._ne.lng;   // Longitude of the image's eastern edge

    var imageLongPixels = mapWidth;		// Width of the image in pixels
    var imageLatPixels = mapHeight;		// Height of the image in pixels

    var pixelsPerLat = imageLatPixels / (imageNorthLat - imageSouthLat);
    var pixelsPerLong = imageLongPixels / (imageEastLong - imageWestLong);

    var x = (lon-imageWestLong) * pixelsPerLong;
    var y = Math.abs(lat-imageNorthLat) * pixelsPerLat;

    console.log('XY', x, y);

    return {
      'left' : x,
      'top' : y
    };
  };

  stopWatchingLocation = () => {
    navigator.geolocation.clearWatch(this.state.locationWatchId);
    this.setState({ lng: '', lat: '', locationWatchId: null });
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
    return (
      <div className="Map">
        <div>
          <div>{`Longitude: ${this.state.lng} Latitude: ${this.state.lat}`}</div>
        </div>
        <button onClick={() => this.stopWatchingLocation()}>
          Stop Location Tracking
        </button>
        <div>
        <img src="https://api.mapbox.com/styles/v1/thepunkyone/cjx34gegp2owc1cqym1n43a11/static/-1.1743196999999999,52.3555177,13,0,0/600x600?access_token=pk.eyJ1IjoidGhlcHVua3lvbmUiLCJhIjoiY2p4MzJjd3g1MG9wZDN5cGtwb2VwY2x0NyJ9.S0cbsxNX2LA2_Zcud97cYw" />
        </div>
      </div>
    );
  }
}

export default StaticGpsLocator;
