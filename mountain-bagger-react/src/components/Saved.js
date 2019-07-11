import React, { Component } from 'react';
import axios from 'axios';

const style = {
  width: '100%',
  height: '100%',
  background: '#20B11D',
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '100',
};

const BASE_URL = 'http://localhost:3030';

class Saved extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      routes: {},
    });
  }

  componentDidMount() {
    this.getSavedRoute();
  }

  handleOnClick = (routeId) => {
    this.deleteSavedRoute(routeId);
  };

  deleteSavedRoute = (routeId) => {
    console.log('here 1');
    axios
      .delete(`${BASE_URL}/user/${this.props.id}/${routeId}`)
      .then(() => {
        console.log('here 2');
        this.getSavedRoute();
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };

  getSavedRoute = () => {
    axios
      .get(`${BASE_URL}/user/${this.props.id}`)
      .then(response => {
        this.setState({
          routes: response.data,
        });
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };

  render() {
    const { routes } = this.state;
    console.log(this.props);
    if (!this.props.name) {
      return (
        <div>You are not logged in!</div>
      )
    }
    return (
      <div style={style}>
        <h1>{this.props.name}'s saved routes</h1>
        {
          Object.keys(routes).length !== 0 && (
            routes.map(route => {
              return (
                <div key={route._id} style={{ border: '1px solid black', margin: '5px', padding: '5px' }}>
                  <h1>{route.name}</h1>
                  <div>Distance is {route.distance}</div>
                  <div>Duration is {route.duration}</div>
                  <div>Route starts at lng: {route.route[0][0]}, lat: {route.route[0][1]} and ends at lng: {route.route[1][0]}, lat: {route.route[1][1]}</div>
                  <button onClick={() => this.handleOnClick(route._id)}>Delete</button>
                </div>
              );
            })
          )
        }
      </div>
    )
  }
}

export default Saved;
