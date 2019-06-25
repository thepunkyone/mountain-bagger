import React from 'react';
import '../style/user-form-page.scss';
import WelcomeHeader from './WelcomeHeader';

const Login = () => {
  return (
    <div className="user-form">
      <WelcomeHeader />
      <form>
        <h2>Sign in</h2>
        <label>
          <span>
            Email
          </span>
          <input type="email" />
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
