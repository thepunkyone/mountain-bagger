import React, { Component } from 'react';
import ReactMapboxG1, { Layer, Feature } from 'react-mapbox-gl';
import '../styles/map.css';
import Geocoder from 'react-mapbox-gl-geocoder';
import { isNullOrUndefined } from 'util';

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
      zoom: 1.5,
      endLng: null,
      endLat: null,
    };
  }

  componentDidMount() {
  }

  onSelected = (viewport, item) => {
    this.setState({
      viewport: viewport,
      lng: item.center[0],
      lat: item.center[1],
    });
  };

  onClick = (map, evt) => {
    const coordsObj = evt.lngLat;
    const coordinates = Object.keys(coordsObj).map((key) => {
      return coordsObj[key];
    });
    this.setState({
      ...this.state,
      endLng: coordinates[0],
      endLat: coordinates[1],
    });
  };

  render() {
    const { endLng, endLat, lng, lat, viewport } = this.state;
    return (
      <div>
        <div>
          <div>{`Longitude: ${lng} Latitude: ${lat}`}</div>
        </div>
        <MapBox
          style="mapbox://styles/mapbox/outdoors-v10/"
          center={[lng, lat]}
          containerStyle={{
            height: '50vh',
            width: '50vh',
          }}
          onClick={this.onClick}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ 'icon-image': 'marker-15' }}
          >
            <Feature coordinates={[lng, lat]} />
          </Layer>

          {
            { endLng } &&
            (
              <Layer
                type="symbol"
                id="marker"
                layout={{ 'icon-image': 'marker-15' }}
              >
                <Feature coordinates={[endLng, endLat]} />
              </Layer>
            ) 
          }
        </MapBox>
        <Geocoder
          viewport={viewport}
          onSelected={this.onSelected}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        />

      </div>
    );
  }
}

export default Map;
