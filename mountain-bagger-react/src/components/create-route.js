import React from 'react';
import { Link } from 'react-router-dom';
import Map from './map';
import Test from './test';
import Search from './search';
import '../styles/create-route.css';

const CreateRoute = (props) => {
  return (
    <div>
      <Link to="/">Profile Page</Link>
      <Map />
    </div>
  );
};

export default CreateRoute;
