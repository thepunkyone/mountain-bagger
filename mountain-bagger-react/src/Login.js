import React from 'react';
import './style/Login.scss';

const Login = () => {
  return (
    <div className="Login">
      <h1>Welcome to MountainBagger</h1>
      <h3>Log in</h3>
      <form>
        <label>
          <span>
            Email:
          </span>
          <input type="text" />
        </label>
        <label>
          <span>
            Password:
          </span>
          <input type="text" />
        </label>
      </form>
      <p>
        Don't have an account?&nbsp;
        <span className="_underlined-link">
          Register
        </span>
      </p>
    </div>
  );
};

export default Login;
