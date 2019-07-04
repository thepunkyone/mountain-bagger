import React, { Component } from 'react';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
}

export default MapContainer;

//gets props from Home.js (selectedTab) and App.js (userId)

//passes conditional props onto map component depending on
//whether (selectedTab is Create New or Not)

//layer display on the Map should be conditional also

//if SaveMap subroute is chosen, then route details
//won't apper (display a button instead?)

//if Create Route subroute is chosen, then save offline map
//option will appear.
