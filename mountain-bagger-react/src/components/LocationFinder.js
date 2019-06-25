import React, { Component } from 'react';

class LocationFinder extends Component {
  constructor() {
    super();
    this.state = {
      placeName: '',
      locationCoordinates: '',
    };
  }

  handleFieldChange = (event) => {
    this.setState({ placeName: event.target.value });
  };

  handlePlaceSearch = (event) => {
    event.preventDefault();
    const placeName = encodeURI(this.state.placeName);
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${placeName}&inputtype=textquery&fields=geometry&key=AIzaSyCT0GFDAfLck9iLtx3SyTyVXb8DR7HuSiU`;
    fetch(proxyurl + url)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        this.setState({ locationCoordinates: data.candidates[0].geometry.location });
      })
      .catch(() => {
        alert('Can\'t get coordinates!');
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handlePlaceSearch}>
          <label>
            Enter placename
            <input type="text" value={this.state.placeName} onChange={this.handleFieldChange} />
          </label>
          <button type="submit">
            Submit
          </button>
        </form>
        <p>
          Latitude: {this.state.locationCoordinates.lat}
        </p>
        <p>
          Longitude: {this.state.locationCoordinates.lng}
        </p>
      </div>
    );
  }
}

export default LocationFinder;