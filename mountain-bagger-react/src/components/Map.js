import React, { Component } from 'react';
import ReactMapboxG1, { Layer, Feature } from 'react-mapbox-gl';
import '../style/Map.scss';
import Geocoder from 'react-mapbox-gl-geocoder';
import SaveForm from './SaveForm';
import Search from './Search';

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
      longitude: -3.2116,
      latitude: 54.4542,
      zoom: [13],
      endLongitude: null,
      endLatitude: null,
      route: {},
      walkingOrCycling: 'walking',
      duration: null,
      distance: null,
      routeName: '',
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

  handleClearRoute = () => {
    this.setState({
      ...this.state,
      endLongitude: null,
      endLatitude: null,
      route: {},
      walkingOrCycling: 'walking',
      duration: null,
      distance: null,
    });
  };

  onSelected = (viewport, item) => {
    this.setState({
      viewport,
      longitude: item.center[0],
      latitude: item.center[1],
    });
  };

  onMapClick = (map, evt) => {
    const coordsObj = evt.lngLat;
    const coordinates = Object.keys(coordsObj).map((key) => {
      return coordsObj[key];
    });
    const endLongitude = coordinates[0];
    const endLatitude = coordinates[1];
    const walkingOrCycling = this.state.walkingOrCycling;
    this.getRoute(endLongitude, endLatitude, walkingOrCycling);
  };

  // onZoom = (map, event) => {
  //   this.setState({ zoom: [...[map.getZoom()]] });
  // };

  onSaveRoute = (routeName) => {
    this.setState({
      routeName,
    }, () => {
      console.log(this.state.routeName);
    });
    console.log(this.state.route);
  };

  handleModeOfTransport = (event) => {
    const endLongitude = this.state.endLongitude;
    const endLatitude = this.state.endLatitude;
    const walkingOrCycling = event.target.value;
    // endLongitude ? this.setState({...this.state, walkingOrCycling}) : this.getRoute(endLongitude, endLatitude, walkingOrCycling);
    if (endLongitude) {
      this.getRoute(endLongitude, endLatitude, walkingOrCycling);
    } else {
      this.setState({
        ...this.state,
        walkingOrCycling,
      });
    }
  };

  getRoute = (endLongitude, endLatitude, walkingOrCycling) => {
    const { longitude, latitude } = this.state;
    const token = process.env.REACT_APP_MAPBOX_TOKEN;
    const apiRequest = `${BASE_URL}/${walkingOrCycling}/${longitude},${latitude};${endLongitude},${endLatitude}${URL_QUERY}${token}`;
    fetch(apiRequest)
      .then(response => response.json())
      .then(data => data.routes[0])
      .then(data => {
        const distance = (data.distance / 1000).toFixed(3);
        const duration = Math.round(data.duration / 60);
        const route = data.geometry.coordinates;
        this.setState({
          ...this.state,
          endLongitude,
          endLatitude,
          route,
          walkingOrCycling,
          duration,
          distance,
        });
      });
  };

  render() {
    const { endLongitude, endLatitude, longitude, latitude, viewport, route, duration, walkingOrCycling, distance} = this.state;
    const modeOfTravel = walkingOrCycling.charAt(0).toUpperCase() + walkingOrCycling.slice(1);
    return (
      <div>
        {
          duration && (
            <div>
              <div className="routeInfomation">
                <div className="modeOfTransport">
                  {`${modeOfTravel}:`}
                </div>
                <div className="distance">
                  {`Distance: ${distance}km`}
                </div>
                <div className="duration">
                  {`Time: ${duration}mins`}
                </div>
              </div>
              <button onClick={() => this.generateStaticMap(this.state.route)}>
                Create static map
              </button>
            </div>
          )
        }
        <div className="map_div">
          <MapBox
            style="mapbox://styles/thepunkyone/cjx34gegp2owc1cqym1n43a11"
            center={[longitude, latitude]}
            containerStyle={{
              height: '600px',
              width: '600px',
            }}
            onClick={this.onMapClick}
            // zoom={zoom}
            // onZoom={this.onZoom}
          >
            <Layer
              type="symbol"
              id="marker-start"
              layout={{ 'icon-image': 'marker-15' }}
            >
              <Feature coordinates={[longitude, latitude]} />
            </Layer>

            {
              { endLongitude } &&
              (
                <Layer
                  type="symbol"
                  id="marker-end"
                  layout={{ 'icon-image': 'marker-15' }}
                >
                  <Feature coordinates={[endLongitude, endLatitude]} />
                </Layer>
              )
            }
            
            {
              Object.keys(route).length !== 0 && (
                <Layer
                  type="line"
                  layout={{
                    'line-join': 'round',
                    'line-cap': 'round',
                  }}
                  paint={{
                    'line-color': '#3887b4',
                    'line-width': 5,
                    'line-opacity': 0.75,
                  }}
                >
                  <Feature coordinates={route} />
                </Layer>
              )
            }
          </MapBox>
        </div>
        <div>
          <button onClick={this.handleModeOfTransport} value="walking">Walking</button>
          <button onClick={this.handleModeOfTransport} value="cycling">Cycling</button>
        </div>
        <Geocoder
          viewport={viewport}
          onSelected={this.onSelected}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        />
        {/* <Search /> */}
        <div>
          <button onClick={this.handleClearRoute}>Clear Route</button>
        </div>
        <SaveForm saveRoute={this.onSaveRoute} />
        <div className="static-map">
          { this.state.imageUrl && <img src={this.state.imageUrl} /> }
        </div>
      </div>
    );
  }
}

export default Map;
