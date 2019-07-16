import React, { Component } from 'react';
import axios from 'axios';
import TokenManager from '../utils/token-manager';
import moment from 'moment';
import '../style/Saved.scss';

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
      maps: [],
    });
  }

  componentDidMount() {
    this.getSavedRoute();
    this.getMaps();
  }

  handleOnClick = (routeId) => {
    this.deleteSavedRoute(routeId);
  };

  getMaps = () => {
    const userId = this.props.id;
    axios.get(`${BASE_URL}/${userId}/maps`)
      .then(response => this.setState({ maps: response.data }))
      .catch((error) => console.log('AXIOS ERROR!', error));
  };

  deleteSavedMap = (mapId) => {
    axios.delete(`${BASE_URL}/${this.props.id}/maps/${mapId}`)
      .then(() => {
        this.getMaps();
      })
      .catch((error) => {
        console.log('Map delete error', error);
      });
  };

  deleteSavedRoute = (routeId) => {
    axios
      .delete(`${BASE_URL}/routes/${this.props.id}/${routeId}`, {
        headers: { Authorization: TokenManager.getToken() },
      })
      .then(() => {
        this.getSavedRoutes();
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };

  getSavedRoutes = () => {
    axios
      .get(`${BASE_URL}/routes/${this.props.id}`, {
        headers: { Authorization: TokenManager.getToken() },
      })
      .then(response => {
        this.setState({
          routes: response.data,
        });
        this.props.onToggleLoading(false);
      })
      .catch(error => {
        console.log(error, 'error');
        this.props.onToggleLoading(false);
      });
  };

  render() {
    const { routes } = this.state;
    if (!this.props.name) {
      return (
        <div>You are not logged in!</div>
      )
    }
    return (
      <div className="menu-overlay">
        <h1>{this.props.name}'s saved routes</h1>
        {
          Object.keys(routes).length !== 0 && (
            routes.map(route => {
              return (
                <div key={route._id} style={{ border: '1px solid black', margin: '5px', padding: '5px' }}>
                  <h1>{route.name}</h1>
                  <div>Distance is {route.distance}km</div>
                  <div>Duration is {route.duration}min</div>
                  <div>Route starts at lng: {route.route[0][0]}, lat: {route.route[0][1]} and ends at lng: {route.route[1][0]}, lat: {route.route[1][1]}</div>
                  <button onClick={() => this.handleOnClick(route._id)}>Delete</button>
                </div>
              );
            })
          )
        }
        <h1>{this.props.name}'s saved maps</h1>
        {
          this.state.maps.length !== 0 && (
            this.state.maps.map(map => {
              return (
                <div className="saved-map" key={map._id} style={{ border: '1px solid black', margin: '5px', padding: '5px' }}>
                  <h1>{map.name}</h1>
                  <p>{moment(map.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
                  <div className="image-container">
                    <img src={map.img} />
                  </div>
                  <button onClick={() => this.props.handleOpenOfflineMap(map)}>Use offline map</button>
                  <button onClick={() => this.deleteSavedMap(map._id)}>Delete</button>
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
