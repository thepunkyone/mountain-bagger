import React, { Component } from 'react';
import axios from 'axios';
import Map from './Map';

const MDB_URL = 'http://localhost:3030/user/';
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
      zoom: [13],
      marker: [-3.2116, 54.4542],
      endLongitude: null,
      endLatitude: null,
      route: '',
      walkingOrCycling: 'walking',
      duration: null,
      distance: null,
      routeName: '',
      staticMap: {
        name: '',
        img: '',
        dimensions: {
          width: '',
          height: '',
        },
        boundingBox: '',
      },
      saveForm: false,
    };
    this.mapRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    this.getCenterCoords();
    const { locationFocus, gpsLongitude, gpsLatitude, searchLocationCoords } = this.props;

    if (locationFocus === 'gps' && gpsLongitude && gpsLongitude !== prevProps.gpsLongitude) {
      this.setState({
        longitude: gpsLongitude,
        latitude: gpsLatitude,
      });
    }

    if (locationFocus === 'marker' && searchLocationCoords &&
        searchLocationCoords[0] !== prevProps.searchLocationCoords[0]) {
      this.updateMarkerPosition(searchLocationCoords);
      const lng = searchLocationCoords[0];
      const lat = searchLocationCoords[1];
      this.setState({
        longitude: lng,
        latitude: lat,
      });
    }
  }

  generateStaticMap = (name, bounds) => {
    const { longitude, latitude, width, height } = this.state;
    const { route, zoom } = this.state;

    if (!route && bounds) {
      fetch(`${STYLES_URL}/static/${longitude},${latitude},${zoom},0,0/${width}x${height}?access_token=${MAPBOX_TOKEN}`)
        .then((data) => {
          this.setState({
            staticMap: {
              name: name || '',
              dimensions: {
                width: width,
                height: height,
              },
              boundingBox: bounds,
              img: data.url,
            },
          }, () => {
            this.postStaticMap();
          });
        })
        .catch(() => console.log('image can\'t be retrieved'));

    } else if (route && bounds) {
      const geojson = {
        "type": "FeatureCollection",
        "features": [{
          "type": "Feature",
          "geometry": {
            "type": "LineString",
            "coordinates": route,
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

      fetch(`${STYLES_URL}/static/${encodeGeoJson()}${longitude},${latitude},${zoom},0,0/${width}x${height}?access_token=${MAPBOX_TOKEN}`)
        .then((data) => {
          this.setState({
            staticMap: {
              name: name || '',
              dimensions: {
                width: width,
                height: height,
              },
              boundingBox: bounds,
              img: data.url,
            },
          }, () => {
            this.apiSaveRoute(name);
          });
        })
        .catch(() => console.log('image can\'t be retrieved'));
    } else {
      console.log('Error: can\'t retrieve map data!');
    }
  };

  getCenterCoords = (center) => {
    const centerCoords = center;
    const prevState = this.state;

    if (centerCoords !== undefined && centerCoords.lng !== prevState.longitude) {
      this.setState({
        longitude: centerCoords.lng,
        latitude: centerCoords.lat,
      });
    }
  };

  getRoute = (endLongitude, endLatitude, walkingOrCycling) => {
    const { marker } = this.state;
    const token = MAPBOX_TOKEN;
    const apiRequest = `${BASE_URL}/${walkingOrCycling}/${marker[0]},${marker[1]};${endLongitude},${endLatitude}${URL_QUERY}${token}`;
    fetch(apiRequest)
      .then(this.props.onToggleLoading(true))
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
        this.props.onToggleLoading(false);
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
    if (this.props.selectedTab === 'create-new') {
      const coordsObj = evt.lngLat;
      const coordinates = Object.keys(coordsObj).map((key) => {
        return coordsObj[key];
      });
      const endLongitude = coordinates[0];
      const endLatitude = coordinates[1];
      const walkingOrCycling = this.state.walkingOrCycling;
      this.getRoute(endLongitude, endLatitude, walkingOrCycling);
    }
  };

  handleModeOfTransport = (event) => {
    const endLongitude = this.state.endLongitude;
    const endLatitude = this.state.endLatitude;
    const walkingOrCycling = event.target.id;
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

  toggleSaveForm = (boolean) => {
    this.setState({ saveForm: boolean });
  };

  postStaticMap = () => {
    const userId = this.props.userId;
    const { staticMap } = this.state;

    const postedMap = {
      name: staticMap.name,
      img: staticMap.img,
      dimensions: [staticMap.dimensions.width, staticMap.dimensions.height],
      boundingBox: [
        [staticMap.boundingBox._ne.lng, staticMap.boundingBox._ne.lat],
        [staticMap.boundingBox._sw.lng, staticMap.boundingBox._sw.lat],
      ],
    };

    axios.post(`http://localhost:3030/${userId}/maps`, postedMap)
      .then(response => console.log('AXIOS RESPONSE!', response.data))
      .catch((error) => console.log('AXIOS ERROR!', error));
  };

  // saveRoute = (routeName) => {
  //   this.setState({
  //     routeName,
  //   }, () => {
  //     this.apiSaveRoute();
  //   });
  // };

  apiSaveRoute = (routeName) => {
    const { staticMap } = this.state;

    const postedMap = {
      name: staticMap.name,
      img: staticMap.img,
      dimensions: [staticMap.dimensions.width, staticMap.dimensions.height],
      boundingBox: [
        [staticMap.boundingBox._ne.lng, staticMap.boundingBox._ne.lat],
        [staticMap.boundingBox._sw.lng, staticMap.boundingBox._sw.lat],
      ],
    };

    axios
      .post(`${MDB_URL}${this.props.userId}/save-route`, {
        name: routeName,
        duration: this.state.duration,
        distance: this.state.distance,
        walkingOrCycling: this.state.walkingOrCycling,
        route: this.state.route,
        userId: this.props.userId,
        map: postedMap,
      })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };


  saveZoomSetting = (map) => {
    this.setState({ zoom: [...[map.getZoom()]] });
  };

  setMapDimensions = () => {
    this.setState({
      width: this.mapRef.current.offsetWidth,
      height: window.innerHeight - 174,
    });
  };

  updateMarkerPosition = (searchCoords) => {
    this.setState({ marker: searchCoords });
  };

  render() {
    window.onresize = this.setMapDimensions;
    console.log('STATIC MAP', this.state.staticMap);

    const {
      selectedTab,
      gpsLongitude,
      gpsLatitude,
    } = this.props;

    const {
      width,
      height,
      longitude,
      latitude,
      zoom,
      marker,
      endLongitude,
      endLatitude,
      route,
      walkingOrCycling,
      duration,
      distance,
      routeName,
      saveForm,
    } = this.state;

    return (
      <Map
        mapRef={this.mapRef}
        selectedTab={selectedTab}
        gpsLongitude={gpsLongitude}
        gpsLatitude={gpsLatitude}

        onBoundingBox={this.getBoundingBox}
        onClearRoute={this.handleClearRoute}
        onGenerateStaticMap={this.generateStaticMap}
        onGetCenterCoords={this.getCenterCoords}
        onHandleModeOfTransport={this.handleModeOfTransport}
        onMapClick={this.handleMapClick}
        onSaveRoute={this.saveRoute}
        onToggleSaveForm={this.toggleSaveForm}
        onZoom={this.saveZoomSetting}

        width={width}
        height={height}
        longitude={longitude}
        latitude={latitude}
        zoom={zoom}
        marker={marker}
        endLongitude={endLongitude}
        endLatitude={endLatitude}
        route={route}
        walkingOrCycling={walkingOrCycling}
        duration={duration}
        distance={distance}
        routeName={routeName}
        saveForm={saveForm}
      />
    );
  }
}

export default MapContainer;
