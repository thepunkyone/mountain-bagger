import React, { Component, Fragment } from 'react';
import axios from 'axios';
import TokenManager from '../utils/token-manager';
import moment from 'moment';
import '../style/Saved.scss';

const BASE_URL = 'http://localhost:3030';

class Saved extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      maps: [],
    });
  }

  componentDidMount() {
    this.getMaps();
  }

  handleOnClick = (routeId) => {
    this.deleteSavedRoute(routeId);
  };

  getMaps = () => {
    const userId = this.props.user.id;
    axios.get(`${BASE_URL}/${userId}/maps`, {
      headers: { Authorization: TokenManager.getToken() },
    })
      .then(response => this.setState({ maps: response.data }))
      .catch((error) => console.log('AXIOS ERROR!', error));
  };

  deleteSavedMap = (mapId) => {
    axios.delete(`${BASE_URL}/${this.props.user.id}/maps/${mapId}`, {
      headers: { Authorization: TokenManager.getToken() },
    })
      .then(() => {
        this.getMaps();
      })
      .catch((error) => {
        console.log('Map delete error', error);
      });
  };

  deleteSavedRoute = (routeId) => {
    axios
      .delete(`${BASE_URL}/routes/${this.props.user.id}/${routeId}`, {
        headers: { Authorization: TokenManager.getToken() },
      })
      .then(() => {
        this.props.getSavedRoutes();
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };

  render() {
    const { user, routes } = this.props;
    if (!user.firstName) {
      return (
        <div>You are not logged in!</div>
      );
    }
    console.log(this.props.routes);
    return (
      <div className="menu-overlay">
        <h1>{user.firstName}'s saved routes</h1>
        {
          Object.keys(routes).length !== 0 && (
            routes.map(route => {
              return (
                <div key={route._id} style={{ border: '1px solid black', margin: '5px', padding: '5px' }}>
                  <h1>{route.name}</h1>
                  <p>{moment(route.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
                  <div>Distance is {route.distance}km</div>
                  <div>Duration is {route.duration}min</div>
                  {/* <div>Route starts at lng: {route.route[0][0]}, lat: {route.route[0][1]} and ends at lng: {route.route[1][0]}, lat: {route.route[1][1]}</div> */}
                  {
                    route.mapId &&
                    (
                      <Fragment>
                        <div className="map-thumbnail">
                          <img src={route.mapId.img} />
                        </div>
                        <button onClick={() => this.props.handleOpenOfflineMap(route.mapId)}>Use offline map</button>
                      </Fragment>
                    )
                  }
                  <button onClick={() => this.handleOnClick(route._id)}>Delete</button>
                </div>
              );
            })
          )
        }
        <h1>{user.firstName}'s saved maps</h1>
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
