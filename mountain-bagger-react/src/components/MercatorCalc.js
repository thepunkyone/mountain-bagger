import React from 'react';
import SphericalMercator from '@mapbox/sphericalmercator';

const mercator = new SphericalMercator({
  size: 256,
});

const ll = [-3.242855, 54.467145];
const zoom = 14;

const bbox = [-3.242855, 54.444492, -3.183203, 54.467145];
const to = '900913';

const Mercator = () => {
  return (
    <div>{mercator.px(ll, zoom)}</div>
  );
};

/*
var mapWidth = 1500;
var mapHeight = 1577;

var mapLonLeft = 9.8;
var mapLonRight = 10.2;
var mapLonDelta = mapLonRight - mapLonLeft;

var mapLatBottom = 53.45;
var mapLatBottomDegree = mapLatBottom * Math.PI / 180;
*/

/* MERCATOR TO PX CALCULATOR */

function convertGeoToPixel(latitude, longitude ,
  mapWidth , // in pixels
  mapHeight , // in pixels
  mapLonLeft , // in degrees
  mapLonDelta , // in degrees (mapLonRight - mapLonLeft);
  mapLatBottom , // in degrees
  mapLatBottomDegree) // in Radians
{
  var x = (longitude - mapLonLeft) * (mapWidth / mapLonDelta);

  latitude = latitude * Math.PI / 180;
  var worldMapWidth = ((mapWidth / mapLonDelta) * 360) / (2 * Math.PI);
  var mapOffsetY = (worldMapWidth / 2 * Math.log((1 + Math.sin(mapLatBottomDegree)) / (1 - Math.sin(mapLatBottomDegree))));
  var y = mapHeight - ((worldMapWidth / 2 * Math.log((1 + Math.sin(latitude)) / (1 - Math.sin(latitude)))) - mapOffsetY);

  return { "x": x , "y": y};
}
//https://stackoverflow.com/questions/2103924/mercator-longitude-and-latitude-calculations-to-x-and-y-on-a-cropped-map-of-the

console.log('Pixels', mercator.px(ll, zoom));
console.log('Mercator projections for bounding box', mercator.convert(bbox, to));
console.log('Mercator projections for single point', mercator.forward(ll));
console.log(convertGeoToPixel(-3.242855, 54.467145, 5000, 5000, -4.242855, -3.183203, 54.444492));


export default Mercator;
