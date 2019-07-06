import React, { Component } from 'react';
import '../style/Home.scss';
import Logo from './Logo';
import ToolsNav from './ToolsNav';
import Weather from './Weather';
import Metrics from './Metrics';
import Saved from './Saved';
import CreateNew from './CreateNew';
import RouteMap from './Old-RouteMap';

import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import ExploreIcon from '@material-ui/icons/Explore';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import SearchIcon from '@material-ui/icons/Search';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

const logoIconStyle = {
  width: '40px',
  height: '40px',
  marginBottom: '-10px',
};

const menuIconStyle = {
  width: '42px',
  height: '42px',
  padding: '5px',
};

const downloadIconStyle = {
  ...menuIconStyle,
  filter: 'drop-shadow(1px 1px 2px #222222)',
};

const menuIconLightStyle = {
  width: '42px',
  height: '42px',
  color: '#888888',
};

class CreateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'create-new',
    };
  }

  selectTab = (e) => {
    e.preventDefault();
    const selectedId = e.target.id;
    this.setState({ selectedTab: selectedId });
  };

  render() {
    const { selectedTab } = this.state;
    return (
      <div className="Home">
        <nav className="UserNav nav-main">
          <MenuIcon style={menuIconStyle} />
          <h2>
            <Logo iconStyle={logoIconStyle} />
          </h2>
          <SettingsIcon style={menuIconStyle} />
        </nav>
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
          <GpsFixedIcon style={menuIconStyle} />
          <SearchIcon style={menuIconStyle} />
        </nav>
        <div className="content">
          {selectedTab === 'create-new' &&
            (
              <div>
                <RouteMap />
                <span>
                  <CloudDownloadIcon style={downloadIconStyle} />
                </span>
              </div>
            )
          }
          {selectedTab === 'weather' && <Weather />}
          {selectedTab === 'metrics' && <Metrics />}
          {selectedTab === 'saved' && <Saved />}
          {selectedTab === 'create-new' && <CreateNew />}
        </div>
        <ToolsNav
          handleClick={this.selectTab}
          selectedTab={this.state.selectedTab}
        />
      </div>
    );
  }
}

export default CreateRoute;

