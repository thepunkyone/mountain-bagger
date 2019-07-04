import React, { Component } from 'react';
import ReactMapboxG1, { Layer, Feature } from 'react-mapbox-gl';
import '../style/Map.scss';
import Geocoder from 'react-mapbox-gl-geocoder';
import SaveForm from './SaveForm';

const MapBox = ReactMapboxG1({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {},
      width: window.innerWidth,
      height: window.innerHeight - 174,
      longitude: -3.2116,
      latitude: 54.4542,
      zoom: [13],
      endLongitude: null,
      endLatitude: null,
      // imageUrl: '',
    };
  }

  // generateStaticMap = (route) => {
  //   const mapUrl = 'https://api.mapbox.com/styles/v1/thepunkyone/cjx34gegp2owc1cqym1n43a11';

  //   if (!route.data) {
  //     fetch(`${mapUrl}/static/${this.state.lng},${this.state.lat},${this.state.zoom},0,0/600x600?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
  //       .then((data) => {
  //         this.setState({ imageUrl: data.url });
  //       })
  //       .catch(() => alert('image can\'t be retrieved'));
  //   } else {
  //     const geojson = {
  //       "type": "FeatureCollection",
  //       "features": [{
  //         "type": "Feature",
  //         "geometry": {
  //           "type": "LineString",
  //           "coordinates": route.data.geometry.coordinates,
  //         },
  //         "properties": {
  //           "stroke": "#3887b4",
  //           "stroke-opacity": 0.75,
  //           "stroke-width": 5,
  //         }
  //       }]
  //     };
  //     const encodeGeoJson = () => {
  //       return `geojson(${encodeURIComponent(JSON.stringify(geojson))})/`;
  //     };

  //     fetch(`${mapUrl}/static/${encodeGeoJson()}${this.state.lng},${this.state.lat},${this.state.zoom},0,0/600x600?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
  //       .then((data) => {
  //         this.setState({ imageUrl: data.url });
  //       })
  //       .catch(() => alert('image can\'t be retrieved'));
  //   }
  // };

  // onSelected = (viewport, item) => {
  //   this.setState({
  //     viewport,
  //     longitude: item.center[0],
  //     latitude: item.center[1],
  //   });
  // };

  // onZoom = (map, event) => {
  //   this.setState({ zoom: [...[map.getZoom()]] });
  // };

  setMapDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 174,
    });
  };

  render() {
    window.onresize = this.setMapDimensions;
    const { endLongitude, endLatitude, longitude, latitude, viewport, route, duration, walkingOrCycling, distance} = this.state;
    return (
      <div>
        <div className="map_div">
          <MapBox
            style="mapbox://styles/thepunkyone/cjx34gegp2owc1cqym1n43a11"
            center={[longitude, latitude]}
            containerStyle={{
              width: this.state.width,
              height: this.state.height,
            }}
            // zoom={zoom}
            // onZoom={this.onZoom}
          />
        </div>
      </div>
    );
  }
}

export default Map;
