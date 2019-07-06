import React from 'react';
import Logo from './Logo';

import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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

const UserNav = (props) => {

  return (
    <nav className="UserNav nav-main">
      <MenuIcon style={{ ...menuIconStyle, cursor: 'pointer' }} />
      <h2>
        <Logo iconStyle={logoIconStyle} />
      </h2>
      <ExitToAppIcon style={{ ...menuIconStyle, cursor: 'pointer' }} />
    </nav>
  );
};

export default UserNav;
