import React from 'react';
import '../style/Login.scss';
import WelcomeHeader from './WelcomeHeader';

const Login = () => {
  return (
    <div className="Login">
      <WelcomeHeader />
      <form>
        <h2>Sign in</h2>
        <label>
          <span>
            Email
          </span>
          <input type="text" />
        </label>
        <label>
          <span>
            Password
          </span>
          <input type="text" />
        </label>
        <button value="Submit" className="action">
          Sign in
        </button>
        <p>
          Don't have an account?&nbsp;
          <span className="underlined-link">
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
