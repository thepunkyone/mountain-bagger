import React, { Component } from 'react';
import ReactMapboxG1, { Layer, Feature } from 'react-mapbox-gl';
// import '../styles/map.css';
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
      zoom: [13],
      endLng: null,
      endLat: null,
      route: {},
      imageUrl: '',
    };
  }

  generateStaticMap = (route) => {
    const mapUrl = 'https://api.mapbox.com/styles/v1/thepunkyone/cjx34gegp2owc1cqym1n43a11';

    if (!route.data) {
      fetch(`${mapUrl}/static/${this.state.lng},${this.state.lat},${this.state.zoom},0,0/600x600?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
        .then((data) => {
          this.setState({ imageUrl: data.url });
        })
        .catch(() => alert('image can\'t be retrieved'));
    } else {
      const geojson = {
        "type": "FeatureCollection",
        "features": [{
          "type": "Feature",
          "geometry": {
            "type": "LineString",
            "coordinates": route.data.geometry.coordinates,
          },
          "properties": {
            "stroke": "#3887b4",
            "stroke-opacity": 0.75,
            "stroke-width": 5,
          }
        }]
      };
      const encodeGeoJson = () => {
        return `geojson(${encodeURIComponent(JSON.stringify(geojson))})/`;
      };

      fetch(`${mapUrl}/static/${encodeGeoJson()}${this.state.lng},${this.state.lat},${this.state.zoom},0,0/600x600?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
        .then((data) => {
          this.setState({ imageUrl: data.url });
        })
        .catch(() => alert('image can\'t be retrieved'));
    }
  };

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

  onZoom = (map, event) => {
    this.setState({ zoom: [...[map.getZoom()]] });
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
        <button onClick={() => this.generateStaticMap(this.state.route)}>
          Create static map
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
          }
        </MapBox>
        <Geocoder
          viewport={viewport}
          onSelected={this.onSelected}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        />
        <div className="static-map">
          { this.state.imageUrl && <img src={this.state.imageUrl} /> }
        </div>
      </div>
    );
  }
}

export default Map;


