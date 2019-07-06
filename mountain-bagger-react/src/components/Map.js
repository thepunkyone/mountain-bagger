import React from 'react';
import ReactMapboxG1, { Layer, Feature } from 'react-mapbox-gl';
import '../style/Map.scss';
import SaveForm from './SaveForm';

const MapBox = ReactMapboxG1({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const Map = (props) => {
  const {
    userId,
    selectedTab,

    onClearRoute,
    onGenerateStaticMap,
    onGetBoundingBox,
    onHandleModeOfTransport,
    onMapClick,
    onSaveRoute,
    onZoom,

    width,
    height,
    longitude,
    latitude,
    gpsLongitude,
    gpsLatitude,
    zoom,
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
          center={
            gpsLongitude ? [gpsLongitude, gpsLatitude] : [longitude, latitude]
          }
          containerStyle={{
            width: width,
            height: height,
          }}
          movingMethod="easeTo"
          onClick={onMapClick}
          onStyleLoad={(map) => onGetBoundingBox(map)}
          onZoomEnd={(map) => onGetBoundingBox(map)}
          onMoveEnd={(map) => onGetBoundingBox(map)}
          zoom={zoom}
          onZoom={onZoom}
        >
          <Layer
            type="symbol"
            id="marker-start"
            layout={{ 'icon-image': 'mountain-15' }}
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
      <div className="save-options">
        <div className="modes-of-transport">
          <button onClick={onHandleModeOfTransport} value="walking">Walking</button>
          <button onClick={onHandleModeOfTransport} value="cycling">Cycling</button>
        </div>
        <div className="clear-route">
          <button onClick={onClearRoute}>Clear Route</button>
        </div>
        <SaveForm saveRoute={onSaveRoute} />
        <button onClick={() => onGenerateStaticMap(route)}>
          Save offline map
        </button>
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
