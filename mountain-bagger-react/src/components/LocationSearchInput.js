import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  google,
} from 'react-places-autocomplete';

const searchOptions = {
  locationBias: { radius: 2000, center: { lat: 54, lng: -3 } },
};

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '', input: '' };
  }

  handleFieldChange = (e) => {
    e.preventDefault();
    this.setState({ input: e.target.value });
  };
 
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };
 
  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              value={this.state.input}
              onChange={(e) => this.handleFieldChange(e)}
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container" style={{ color: 'black' }}>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
