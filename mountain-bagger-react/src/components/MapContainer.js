import React, { Component } from 'react';
import Map from './Map';

const BASE_URL = 'https://api.mapbox.com/directions/v5/mapbox';
const URL_QUERY = '?steps=true&geometries=geojson&access_token=';
const STYLES_URL = 'https://api.mapbox.com/styles/v1/thepunkyone/cjx34gegp2owc1cqym1n43a11';
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight - 174,
      longitude: -3.2116,
      latitude: 54.4542,
      zoom: [11],
      endLongitude: null,
      endLatitude: null,
      route: '',
      walkingOrCycling: 'walking',
      duration: null,
      distance: null,
      routeName: '',
      staticImageUrl: '',
    };
  }

  generateStaticMap = (route) => {
    const { longitude, latitude } = this.state;
    const { zoom } = this.state;

    if (!route) {
      fetch(`${STYLES_URL}/static/${longitude},${latitude},${zoom},0,0/600x600?access_token=${MAPBOX_TOKEN}`)
        .then((data) => {
          this.setState({ staticImageUrl: data.url });
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

      fetch(`${STYLES_URL}/static/${encodeGeoJson()}${longitude},${latitude},${zoom},0,0/600x600?access_token=${MAPBOX_TOKEN}`)
        .then((data) => {
          this.setState({ staticImageUrl: data.url });
        })
        .catch(() => console.log('image can\'t be retrieved'));
    }
  };

  getRoute = (endLongitude, endLatitude, walkingOrCycling) => {
    const { longitude, latitude } = this.state;
    const token = MAPBOX_TOKEN;
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

  handleClearRoute = () => {
    this.setState({
      ...this.state,
      endLongitude: null,
      endLatitude: null,
      route: '',
      walkingOrCycling: 'walking',
      duration: null,
      distance: null,
    });
  };

  handleMapClick = (map, evt) => {
    const coordsObj = evt.lngLat;
    const coordinates = Object.keys(coordsObj).map((key) => {
      return coordsObj[key];
    });
    const endLongitude = coordinates[0];
    const endLatitude = coordinates[1];
    const walkingOrCycling = this.state.walkingOrCycling;
    this.getRoute(endLongitude, endLatitude, walkingOrCycling);
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

  saveRoute = (routeName) => {
    this.setState({
      routeName,
    }, () => {
      console.log(this.state.routeName);
    });
    console.log(this.state.route);
  };

  saveZoomSetting = (map, event) => {
    this.setState({ zoom: [...[map.getZoom()]] });
  };

  setMapDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 174,
    });
  };

  render() {
    window.onresize = this.setMapDimensions;

    const {
      userId,
      selectedTab,
      gpsLongitude,
      gpsLatitude
    } = this.props;

    const {
      width,
      height,
      longitude,
      latitude,
      zoom,
      endLongitude,
      endLatitude,
      route,
      walkingOrCycling,
      duration,
      distance,
      routeName,
    } = this.state;

    return (
      <Map
        userId = {userId}
        selectedTab = {selectedTab}

        onGenerateStaticMap = {this.generateStaticMap}
        onClearRoute = {this.handleClearRoute}
        onHandleModeOfTransport = {this.handleModeOfTransport}
        onMapClick = {this.handleMapClick}
        onSaveRoute = {this.saveRoute}
        onZoom = {this.saveZoomSetting}

        width = {width}
        height = {height}
        longitude = {longitude}
        latitude = {latitude}
        gpsLongitude = {gpsLongitude}
        gpsLatitude = {gpsLatitude}
        zoom = {zoom}
        endLongitude = {endLongitude}
        endLatitude = {endLatitude}
        route = {route}
        walkingOrCycling = {walkingOrCycling}
        duration = {duration}
        distance = {distance}
        routeName = {routeName}
      />
    );
  }
}

export default MapContainer;

//gets props from Home.js (selectedTab) and App.js (userId)

//passes conditional props onto map component depending on
//whether (selectedTab is Create New or Not)

//layer display on the Map should be conditional also

//if SaveMap subroute is chosen, then route details
//won't apper (display a button instead?)

//if Create Route subroute is chosen, then save offline map
//option will appear.
