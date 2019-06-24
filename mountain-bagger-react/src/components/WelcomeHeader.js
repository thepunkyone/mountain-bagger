import React, { Fragment } from 'react';
import TerrainIcon from '@material-ui/icons/Terrain';
import '../style/WelcomeHeader.scss';

const logoStyle = {
  width: '50px',
  height: '50px',
  marginBottom: '-12px',
};

const WelcomeHeader = () => {
  return (
    <Fragment>
      <h2>
        Welcome to
      </h2>
      <h1>
        MountainBagger
        <TerrainIcon style={logoStyle} />
      </h1>
    </Fragment>
  );
};

export default WelcomeHeader;
