const axios = require('axios');

const routeCoords = [[-3.211556,54.454235],[-3.21208,54.45465],[-3.213161,54.454742],[-3.2145,54.455131],[-3.215379,54.455181],[-3.2166,54.455593],[-3.217155,54.455558],[-3.218654,54.456306],[-3.218401,54.456729],[-3.217723,54.457077],[-3.218925,54.458412],[-3.219466,54.458705],[-3.220969,54.458599],[-3.222998,54.457878],[-3.223542,54.457847],[-3.223563,54.457603],[-3.224181,54.457626],[-3.22417,54.457057],[-3.224722,54.456928],[-3.224634,54.456542],[-3.225014,54.456485],[-3.225019,54.456287],[-3.22612,54.455764],[-3.228139,54.455432],[-3.229483,54.454872],[-3.231469,54.454532],[-3.232373,54.454219],[-3.233876,54.454113]];
const apiToken = process.env.MAPBOX_TOKEN;

let elevationData;
let distanceData;

const getElevation = (routeCoords) => {
  return Promise.all(routeCoords.map(coords => axios.get(`https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${coords[0]},${coords[1]}.json?&access_token=${apiToken}`)))
  .then(allElevations => {
    console.log(allElevations)
    return allElevations
  });
}

const getDistance = (routeCoords) => {
  return Promise.all(routeCoords.map(coords => {
    const nextCoordsIndex = routeCoords.indexOf(coords) + 1;
    const nextCoords = routeCoords[nextCoordsIndex];
      axios.get(`https://api.mapbox.com/directions/v5/mapbox/walking/${coords[0]},${coords[1]};${nextCoords[0]},${nextCoords[1]}$?steps=true&geometries=geojson&access_token=${apiToken}`)
      .then(allDistances => {
        console.log(allDistances)
        return allDistances
      })
    }
  ))
}

exports.getRouteData = (req, res) => {
  return Promise.all(
    elevationData = getElevation(routeCoords),
    distanceData = getDistance(routeCoords),
    res.status(200).json({ elevationData: elevationData, distanceData: distanceData })
  )
}
