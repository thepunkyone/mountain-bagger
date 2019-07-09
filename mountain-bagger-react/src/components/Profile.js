import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CreateRoute from './CreateRoute';
// import '../styles/profile.css';

const BASE_URL = 'http://localhost:3030';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: {},
    };
  }

  componentDidMount() {
    this.getSavedRoutes();
  }

  getSavedRoutes = () => {
    axios
      .get(`${BASE_URL}/user/${this.props.id}`)
      .then(response => {
        this.setState({
          routes: response.data,
        });
      })
      .catch((error) => {
        console.log(error, 'error catch');
      });
  };

  // saveRoute = (route) => {
  //   axios
  //     .post(`${BASE_URL}/user/${this.props.id}/save-route`)
  //     .send(route)
  //     .then(() => {
  //       this.getSavedRoutes();
  //     });
  // }

  render() {
    const { routes } = this.state;
    console.log(this.props.id);
    if (!this.props.name) {
      return (
        <div>You are not logged in!</div>
      );
    }
    return (
      <div>
        <Link to={{
          pathname: '/create-route',
          createRouteProps: {
            id: this.props.id,
          },
        }}
        >
          Create Route
        </Link>
        <h1>{this.props.name}</h1>
        {
          Object.keys(routes).length !== 0 && (
            routes.map(route => {
              return (
                <div key={route._id} style={{ border: '1px solid black', margin: '5px', padding: '5px' }}>
                  <h1>{route.name}</h1>
                  <div>Distance is {route.distance}</div>
                  <div>Duration is {route.duration}</div>
                  <div>Route starts at lng: {route.route[0][0]}, lat: {route.route[0][1]} and ends at lng: {route.route[1][0]}, lat: {route.route[1][1]}</div>
                </div>
              );
            })
          )
        }
      </div>
    );
  }
}

export default Profile;
