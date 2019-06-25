import React from 'react';
import '../style/Home.scss';
import Logo from './Logo';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import ExploreIcon from '@material-ui/icons/Explore';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import SearchIcon from '@material-ui/icons/Search';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import MapIcon from '@material-ui/icons/Map';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import AddBoxIcon from '@material-ui/icons/AddBox';

const logoIconStyle = {
  width: '40px',
  height: '40px',
  marginBottom: '-10px',
};

const menuIconStyle = {
  width: '42px',
  height: '42px',
};

const menuIconLightStyle = {
  width: '42px',
  height: '42px',
  color: '#888888',
};

const menuIconLargeStyle = {
  width: '60px',
  height: '60px',
};

const Home = () => {
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
      <div className="Map">
        <span>
          <CloudDownloadIcon style={menuIconStyle} />
        </span>
      </div>
      <nav className="ToolsNav nav-main">
        <InsertChartIcon style={menuIconLargeStyle} />
        <MapIcon style={menuIconLargeStyle} />
        <AddBoxIcon style={menuIconLargeStyle} />
      </nav>
    </div>
  );
};

export default Home;
