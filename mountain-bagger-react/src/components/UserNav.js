import React from 'react';
import Logo from './Logo';
import logoGreen from '../img/logo-green.svg';

import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const logoIconStyle = {
  width: '40px',
  height: '40px',
  marginBottom: '-8px',
  marginLeft: '-2px',
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
        <Logo iconStyle={logoIconStyle} iconImage={logoGreen} />
      </h2>
      <ExitToAppIcon style={{ ...menuIconStyle, cursor: 'pointer' }} />
    </nav>
  );
};

export default UserNav;
