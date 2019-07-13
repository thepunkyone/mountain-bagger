import React, { Component } from 'react';
import '../style/SearchBox.scss';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const checkCircleStyle = {
  width: '42px',
  height: '42px',
};

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeName: '',
    };
  }

  componentDidMount() {
    this.props.inputRef.current.focus();
  }

  handleFieldChange = (event) => {
    this.setState({ placeName: event.target.value });
  };

  handlePlaceSearch = (event) => {
    event.preventDefault();
    
    const placeName = encodeURI(this.state.placeName);
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${placeName}&inputtype=textquery&fields=geometry&locationbias=circle:35000@47.54.493881,-3.104226&key=${apiKey}`;
    fetch(proxyurl + url)
      .then(
        this.props.onLoading(true),
        this.props.onSearchLocation(''),
        this.props.onResetSelectedTab(),
        this.props.handleCloseOfflineMap()
      )
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        const { lng, lat } = data.candidates[0].geometry.location;
        const locationCoords = [lng, lat];
        this.props.onSearchLocation(locationCoords);
        this.props.onLoading(false);
      })
      .catch(() => {
        this.props.onLoading(false);
        console.log('Can\'t get coordinates!');
      });
  };

  render() {
    return (
      <div className="SearchBox" ref={this.props.searchRef}>
        <form onSubmit={this.handlePlaceSearch}>
          <input type="text" placeholder="Enter placename" ref={this.props.inputRef} value={this.state.placeName} onChange={this.handleFieldChange} />
          <button type="submit">
            <CheckCircleIcon style={checkCircleStyle} />
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBox;
