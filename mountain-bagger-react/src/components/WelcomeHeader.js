import React, { Fragment } from 'react';
import '../style/WelcomeHeader.scss';
import Logo from './Logo';

const iconStyle = {
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
        <Logo iconStyle={iconStyle} />
      </h1>
    </Fragment>
  );
};

export default WelcomeHeader;
