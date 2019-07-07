import React from 'react';
import ReactMapboxG1, { Layer, Feature, Marker } from 'react-mapbox-gl';
import SaveForm from './SaveForm';
import '../style/Map.scss';
import GpsFixedIcon from '../img/gps_fixed_24px.svg';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import PlaceIcon from '@material-ui/icons/Place';

const MapBox = ReactMapboxG1({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const downloadIconStyle = {
  width: '42px',
  height: '42px',
  padding: '5px',
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  filter: 'drop-shadow(1px 1px 2px #222222)',
};

const placeIconStyle = {
  width: '24px',
  height: '24px',
  color: '#0F590D',
}

let center;
let bounds;

const Map = (props) => {

  const {
    userId,
    selectedTab,
    gpsLongitude,
    gpsLatitude,

    onClearRoute,
    onGenerateStaticMap,
    onGetCenterCoords,
    onHandleModeOfTransport,
    onMapClick,
    onSaveRoute,
    onZoom,

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
  } = props;

  const modeOfTravel = walkingOrCycling.charAt(0).toUpperCase() + walkingOrCycling.slice(1);

  return (
    <div>
      <div className="map_div">
        <MapBox
          style="mapbox://styles/thepunkyone/cjx34gegp2owc1cqym1n43a11"
          center={[longitude, latitude]}
          containerStyle={{
            width: width,
            height: height,
          }}
          movingMethod="jumpTo"
          onClick={onMapClick}
          zoom={zoom}
          onZoom={onZoom}
          
          onZoomEnd={(map) => {bounds = map.getBounds(); center = map.getCenter(); onGetCenterCoords(center)}}
          onMoveEnd={(map) => {bounds = map.getBounds(); center = map.getCenter(); onGetCenterCoords(center)}}
          onStyleLoad={(map) => {bounds = map.getBounds(); center = map.getCenter(); onGetCenterCoords(center)}}
        >
          <Marker
            id="marker-start"
            coordinates={marker}
            anchor="bottom"
          >
            <PlaceIcon style={ {...placeIconStyle, color: '#20B11D'} } />
          </Marker>
          {
            { endLongitude } &&
            (
              <Marker
                id="marker-end"
                coordinates={[endLongitude, endLatitude]}
                anchor="bottom"
              >
                <PlaceIcon style={placeIconStyle} />
              </Marker>
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
          {
           gpsLongitude && gpsLatitude &&
           (
             <Marker
               coordinates={[gpsLongitude, gpsLatitude]}
               anchor="center"
             >
               <img src={GpsFixedIcon} />
             </Marker>
           ) 
          }
        </MapBox>
      </div>
      <CloudDownloadIcon
        style={{ ...downloadIconStyle, cursor: 'pointer' }}
        onClick={onGenerateStaticMap('Map', bounds)}
      />
      <div className="save-options">
        <div className="modes-of-transport">
          <button onClick={onHandleModeOfTransport} value="walking">Walking</button>
          <button onClick={onHandleModeOfTransport} value="cycling">Cycling</button>
        </div>
        <div className="clear-route">
          <button onClick={onClearRoute}>Clear Route</button>
        </div>
        <SaveForm
          boundingBox={bounds}
          saveRoute={onSaveRoute}
          saveStaticMap={onGenerateStaticMap}
        />
      </div>
      {
        duration && (
          <div className="route-estimates">
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
          </div>
        )
      }
    </div>
  );
}

export default Map;
