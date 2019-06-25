import React, { Component } from 'react';
import ReactMapboxG1, { Layer, Feature, } from 'react-mapbox-gl';
import '../styles/map.css';
import Geocoder from 'react-mapbox-gl-geocoder';

const MapBox = ReactMapboxG1({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const BASE_URL = 'https://api.mapbox.com/directions/v5/mapbox';
const URL_QUERY = '?steps=true&geometries=geojson&access_token=';

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
      route: {},
    };
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
    this.getRoute();
  };

  getRoute = () => {
    const travel = 'walking';
    const { lng, lat, endLng, endLat } = this.state;
    const token = process.env.REACT_APP_MAPBOX_TOKEN;
    const apiRequest = `${BASE_URL}/${travel}/${lng},${lat};${endLng},${endLat}${URL_QUERY}${token}`;
    fetch(apiRequest)
      .then(response => response.json())
      .then(data => data.routes[0].geometry.coordinates)
      .then(data => {
        const geojson = {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: data,
            },
          },
        };
        this.setState({
          ...this.state,
          route: geojson,
        });
      });
  };

  render() {
    const { endLng, endLat, lng, lat, viewport, route, zoom } = this.state;
    console.log(route);
    return (
      <div>
        <div>
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
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
            id="marker-start"
            layout={{ 'icon-image': 'marker-15' }}
          >
            <Feature coordinates={[lng, lat]} />
          </Layer>

          {
            { endLng } &&
            (
              <Layer
                type="symbol"
                id="marker-end"
                layout={{ 'icon-image': 'marker-15' }}
              >
                <Feature coordinates={[endLng, endLat]} />
              </Layer>
            )
          }

          {
            Object.keys(route).length !== 0 && (
              <Layer
                id="route"
                type="line"
                sourceId={route}
                layout={{
                  'line-join': 'round',
                  'line-cap': 'round',
                }}
                paint={{
                  'line-color': '#3887b4',
                  'line-width': 5,
                  'line-opacity': 0.75,
                }}
              />
            )
          } */}
          
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
