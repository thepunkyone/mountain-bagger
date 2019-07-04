import React from 'react';
import { Link } from 'react-router-dom';
// import '../styles/profile.css';

const Profile = (props) => {
  return (
    <div>
      <Link to="/create-route">Create Route</Link>
      <h1>{props.firstName}</h1>
      <h2>{props.id}</h2>
    </div>
  );
}

export default Profile;
