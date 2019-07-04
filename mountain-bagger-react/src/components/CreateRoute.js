import React from 'react';
import { Link } from 'react-router-dom';
import Map from './Map';
// import Test from './test';
// import Search from './Search';
// import '../styles/create-route.css';
// import MapTest from './map-test';

const CreateRoute = (props) => {
  return (
    <div>
      <Link to="/">Profile Page</Link>
      <Map />
    </div>
  );
};

export default CreateRoute;
