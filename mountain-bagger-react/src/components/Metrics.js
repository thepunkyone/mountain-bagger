import React from 'react';
import MapboxElevation from 'mapbox-elevation';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


// const BASE_URL = 'https://api.mapbox.com/directions/v5/mapbox';
// const URL_QUERY = '?steps=true&geometries=geojson&access_token=';
const getElevation = MapboxElevation(process.env.REACT_APP_MAPBOX_TOKEN);
const altitudeArray = [];
// const data = [];
const merged = null;
const dataKeys = ['distance', 'Meters'];
const distance = [1, 2, 3, 4, 5, 6];

// dummy graph data
const data = [
  {
    distance: '2km', Meters: 196,
  },
  {
    distance: '4km', Meters: 312,
  },
  {
    distance: '6km', Meters: 443,
  },
  {
    distance: '8km', Meters: 491,
  },
  {
    distance: '10km', Meters: 631,
  },
  {
    distance: '12km', Meters: 832,
  },
  {
    distance: '14km', Meters: 931,
  },
];

class Metrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wayPoints: [[-3.211555, 54.454235], [-3.2105, 54.454357], [-3.209996, 54.454647], [-3.209816, 54.45494], [-3.20963, 54.455429], [-3.209266, 54.455776]],
      elevation: [],
    };
  }

  // used by calcRow function
  toRad = (Value) => {
    return Value * Math.PI / 180;
  };

  // calculates distance between two sets of co-ordinates e.g. this.calcCrow(-3.211555, 54.454235, -3.209266, 54.455776)
  calcCrow = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const lat3 = this.toRad(lat1);
    const lat4 = this.toRad(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat3) * Math.cos(lat4);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d.toFixed(2);
  };

  // calculates elevation at each set of co-ordinates in wayPoints state
  elevationData = () => {
    this.state.wayPoints.map(coordinatePair => {
      getElevation(coordinatePair, (err, elevation) => {
        altitudeArray.push(Math.trunc(elevation));
        // this.setState({ elevation: altitudeArray });
      });
    });
  };

  // ****NOT WORKING**** was trying to adapt this so i could create an array of objects, each containing elevation and distance for each point on the graph and pushing into data array from https://stackoverflow.com/questions/53055065/convert-two-arrays-into-object-javascript
  graphData = () => { 
    merged.forEach(r => {
      const obj = {};
      r.forEach((s, i) => {
        obj[dataKeys[i]] = s;
      });
      data.push(obj);
    });
    // console.log(data);
  };

  // ****NOT WORKING**** was going to merge altitude and distance in array alternately to use in graphData function so it would match each part of the data to the correct keys
  arrayMerge = () => {
    const l = Math.min(distance.length, altitudeArray.length);
    const merged = [].concat(...Array.from({ length: l }, (_, i) => [distance[i], altitudeArray[i]]), distance.slice(l), altitudeArray.slice(l));
    // console.log(merged);
  };

  render() {
    // console.log(altitudeArray);
    // console.log(this.calcCrow(-3.211555, 54.454235, -3.209266, 54.455776));
    return (
      <div className="menu-overlay">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="distance" label="Distance" />
          <YAxis dataKey="Meters" label="Elevation" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Meters" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
        
        {
          this.elevationData()
        }
      </div>
    );
  }
}


export default Metrics;
