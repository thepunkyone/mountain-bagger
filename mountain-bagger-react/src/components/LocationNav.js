import React from 'react';
import { Link } from 'react-router-dom';

import ExploreIcon from '@material-ui/icons/Explore';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import GpsNotFixedIcon from '@material-ui/icons/GpsNotFixed';
import SearchIcon from '@material-ui/icons/Search';

const menuIconStyle = {
  width: '42px',
  height: '42px',
  padding: '5px',
};

const menuIconLightStyle = {
  width: '42px',
  height: '42px',
  color: '#888888',
};

const LocationNav = (props) => {

  const {
    onWatchUserLocation,
    onStopWatchingLocation,
    locationWatchId,
  } = props;

  return (
    <nav className="LocationNav nav-main">
      <div className="nav-metrics">
        <p className="menu-icon-light">
          <span>
            Altitude
          </span>
          <span>
            156m
          </span>
        </p>
        <p className="menu-icon-light">
          <span>
            Speed
          </span>
          <span>
            2km/h
          </span>
        </p>
        <ExploreIcon style={menuIconLightStyle} />
      </div>
      {locationWatchId === null ?
        (
          <GpsNotFixedIcon
            style={{ ...menuIconStyle, cursor: 'pointer' }}
            onClick={() => onWatchUserLocation()}
          />
        )
        :
        (
          <GpsFixedIcon
            style={{ ...menuIconStyle, cursor: 'pointer' }}
            onClick={() => onStopWatchingLocation(locationWatchId)}
          />
        )
      }
      <Link
        to="#"
        onClick={(e) => props.handleClick(e)}
      >
        <SearchIcon
          style={{ ...menuIconStyle, cursor: 'pointer' }}
        />
        <div id="search" className="tab-overlay" />
      </Link>
    </nav>
  );
};

export default LocationNav;
