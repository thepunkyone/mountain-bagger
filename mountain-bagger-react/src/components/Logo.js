import React, { Fragment } from 'react';
import TerrainIcon from '@material-ui/icons/Terrain';


const Logo = (props) => {
  const { iconStyle } = props;

  return (
    <Fragment>
      MountainBagger
      <TerrainIcon style={iconStyle} />
    </Fragment>
  );
};

export default Logo;
