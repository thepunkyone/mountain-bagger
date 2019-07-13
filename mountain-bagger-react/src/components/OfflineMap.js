import React, { Component } from 'react';
import GpsFixedIcon from '../img/gps_fixed_24px.svg';

class OfflineMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pxX: '',
      pxY: '',
    };
  }

  componentDidMount() {
    if (this.props.gpsLongitude) {
      this.convertLocationToPx(this.props.gpsLongitude, this.props.gpsLatitude);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.gpsLongitude !== prevProps.gpsLongitude) {
      this.convertLocationToPx(this.props.gpsLongitude, this.props.gpsLatitude);
    }
  }

  convertLocationToPx = (longitudeGps, latitudeGps) => {
    const { width: mapWidth, height: mapHeight } = this.props.map.dimensions;
    const { ne, sw } = this.props.map.boundingBox;
    const lng = longitudeGps;
    const lat = latitudeGps;

    const imageNorthLat = ne[1]; // Latitude of the image's northern edge
    const imageSouthLat = sw[1]; // Latitude of the image's southern edge

    const imageWestLng = sw[0]; // Longitude of the image's western edge
    const imageEastLng = ne[0]; // Longitude of the image's eastern edge

    const imageLngPixels = mapWidth; // Width of the image in pixels
    const imageLatPixels = mapHeight; // Height of the image in pixels

    const pixelsPerLat = imageLatPixels / (imageNorthLat - imageSouthLat);
    const pixelsPerLng = imageLngPixels / (imageEastLng - imageWestLng);

    const x = (lng - imageWestLng) * pixelsPerLng;
    const y = Math.abs(lat - imageNorthLat) * pixelsPerLat;

    this.setState({ pxX: x, pxY: y });
  };

  render() {
    const { map, handleCloseOfflineMap } = this.props;

    const gpsIconStyle = {
      top: this.state.pxY - 12,
      left: this.state.pxX - 12,
    };

    return (
      <div className="offline-map">
        <div className="offline-map__options">
          <h2>{map.name}</h2>
          <button onClick={() => handleCloseOfflineMap()}>Close</button>
        </div>
        <img src={this.props.map.img} />
        {this.state.pxY && <img src={GpsFixedIcon} style={gpsIconStyle} className="gps-icon" />}
      </div>
    );
  }
}

export default OfflineMap;
