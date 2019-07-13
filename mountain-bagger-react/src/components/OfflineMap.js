import React, { Component } from 'react';

class OfflineMap extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="offline-map">
        <div className="offline-map__options">
          <h2>{this.props.map.name}</h2>
          <button onClick={() => this.props.handleCloseOfflineMap}>Close</button>
        </div>
        <img src={this.props.map.img} />
      </div>
    );
  }
}

export default OfflineMap;
