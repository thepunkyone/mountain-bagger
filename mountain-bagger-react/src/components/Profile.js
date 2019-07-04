import React from 'react';
import { Link } from 'react-router-dom';
// import '../styles/profile.css';

const Profile = (props) => {
  return (
    <div>
      <Link to="/create-route">Create Route</Link>
      <h1>{props.name}</h1>
    </div>
  );
}

export default Profile;
