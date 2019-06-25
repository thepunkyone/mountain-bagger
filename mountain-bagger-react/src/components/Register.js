import React from 'react';
import '../style/user-form-page.scss';
import WelcomeHeader from './WelcomeHeader';

const Register = () => {
  return (
    <div className="user-form">
      <WelcomeHeader />
      <form>
        <h2>Register</h2>
        <label>
          <span>
            Name
          </span>
          <input type="text" />
        </label>
        <label>
          <span>
            Surname
          </span>
          <input type="text" />
        </label>
        <label>
          <span>
            Email
          </span>
          <input type="email" />
        </label>
        <label>
          <span>
            Repeat email
          </span>
          <input type="email" />
        </label>
        <label>
          <span>
            Password
          </span>
          <input type="text" />
        </label>
        <label>
          <span>
            Repeat password
          </span>
          <input type="text" />
        </label>
        <button value="Submit" className="action">
          Register
        </button>
        <p>
          Already have an account?&nbsp;
          <span className="underlined-link">
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
