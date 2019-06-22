import React from 'react';
import { Link } from 'react-router-dom';
import ReactMapboxG1, { Layer, Feature } from 'react-mapbox-gl'; 
import '../styles/CreateRoute.css';

const Map = ReactMapboxG1({
  accessToken: 'pk.eyJ1IjoidGhlcHVua3lvbmUiLCJhIjoiY2p4MzJjd3g1MG9wZDN5cGtwb2VwY2x0NyJ9.S0cbsxNX2LA2_Zcud97cYw',
});

const CreateRoute = (props) => {
  return (
    <div>
      <Link to="/">Profile Page</Link>
      <Map 
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "50vh",
          width: "50vh",
        }}>
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}>
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
          </Layer>
      </Map>

    </div>
  );
};

export default CreateRoute;
