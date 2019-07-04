import React from 'react';
import { Link } from 'react-router-dom';
import '../style/user-form-page.scss';
import WelcomeHeader from './WelcomeHeader';

const Login = ({
  handleInputChange,
  handleLogin,
  email,
  password,
  errorMessage,
}) => {
  return (
    <div className="user-form">
      <WelcomeHeader />
      <form onSubmit={handleLogin}>
        <h2>Sign in</h2>
        <label>
          <span>
            Email
          </span>
          <input type="email" name="email" value={email} onChange={handleInputChange} required />
        </label>
        <label>
          <span>
            Password
          </span>
          <input type="password" name="password" value={password} onChange={handleInputChange} required />
        </label>
        <button value="Submit" className="action">
          Sign in
        </button>
        {
          errorMessage &&
          <div><span>{errorMessage}</span></div>
        }
        <p>
          Don't have an account?&nbsp;
          <span className="underlined-link">
            <Link to="/register">Register</Link>
          </span>
        </p>
      </form>
    </div>
  );
};


export default Login;
