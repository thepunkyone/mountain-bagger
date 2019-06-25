import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import React, { Component } from 'react';
import MapGL from 'react-map-gl';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import Geocoder from 'react-map-gl-geocoder';

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class Search extends Component {
  state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 54.4542,
      longitude: -3.2116,
      zoom: 8,
    },
    searchResultLayer: null,
  };

  mapRef = React.createRef();

  // componentDidMount() {
  //   window.addEventListener('resize', this.resize);
  //   this.resize();
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.resize);
  // }

  // resize = () => {
  //   this.handleViewportChange({
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //   });
  // };

  handleViewportChange = viewport => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport },
    });
  };

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides,
    });
  };

  handleOnResult = event => {
    this.setState({
      searchResultLayer: new GeoJsonLayer({
        id: 'search-result',
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
      }),
    });
  };

  render() {
    const { viewport, searchResultLayer } = this.state;
    return (
      <MapGL
        ref={this.mapRef}
        mapStyle="mapbox://styles/mapbox/outdoors-v9"
        {...viewport}
        onViewportChange={this.handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <Geocoder
          mapRef={this.mapRef}
          onResult={this.handleOnResult}
          onViewportChange={this.handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
        <DeckGL {...viewport} layers={[searchResultLayer]} />
      </MapGL>
    );
  }
}

export default Search;
