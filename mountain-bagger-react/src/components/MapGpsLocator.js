import React, { Component } from 'react';
import ReactMapboxG1, { Layer, Feature, Marker } from 'react-mapbox-gl';
import '../style/Map.scss';
import GpsFixedIcon from '../img/gps_fixed_24px.svg';

const MapBox = ReactMapboxG1({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {},
      lng: -3.2116,
      lat: 54.4542,
      zoom: [13],
      locationWatchId: null,
    };
  }

  componentDidMount() {
    this.watchUserLocation();
  }

  stopWatchingLocation = () => {
    navigator.geolocation.clearWatch(this.state.locationWatchId);
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

  onZoom = (map, event) => {
    this.setState({ zoom: [...[map.getZoom()]] });
  };

  render() {
    const { endLng, endLat, lng, lat, viewport, route, zoom } = this.state;
    return (
      <div className="Map">
        <div>
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <button onClick={() => this.stopWatchingLocation()}>
          Stop Location Tracking
        </button>
        <MapBox
          style="mapbox://styles/thepunkyone/cjx34gegp2owc1cqym1n43a11"
          center={[lng, lat]}
          containerStyle={{
            height: '600px',
            width: '600px',
          }}
          onClick={this.onClick}
          zoom={zoom}
          onZoom={this.onZoom}
          movingMethod="jumpTo"
        >
          <Marker
            coordinates={[lng, lat]}
            anchor="center"
          >
            <img src={GpsFixedIcon} />
          </Marker>
        </MapBox>
      </div>
    );
  }
}

export default Map;
