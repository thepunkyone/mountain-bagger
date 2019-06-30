import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/user-form-page.scss';
import WelcomeHeader from './WelcomeHeader';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      confirmEmail: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleLogin = () => {
    const { email, confirmEmail, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("Passwords don't match");
    } else if (email !== confirmEmail) {
      alert('Email does not match');
    } else {
      axios.post('http://localhost:3030/user', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      })
        .then(() => {
          this.props.history.push('/login');
        });
    }
};

  render() {
    return (
      <div className="user-form">
        <WelcomeHeader />
        <form>
          <h2>Register</h2>
          <label>
            <span>
            Name
            </span>
            <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} />
          </label>
          <label>
            <span>
            Surname
            </span>
            <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} />
          </label>
          <label>
            <span>
            Email
            </span>
            <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
          </label>
          <label>
            <span>
            Repeat email
            </span>
            <input type="email" name="confirmEmail" value={this.state.confirmEmail} onChange={this.handleInputChange} />
          </label>
          <label>
            <span>
            Password
            </span>
            <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
          </label>
          <label>
            <span>
            Repeat password
            </span>
            <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInputChange} />
          </label>
          <button value="Submit" className="action" onClick={this.handleLogin}>
          Register
          </button>
          <p>
          Already have an account?&nbsp;
            <span className="underlined-link">
              <Link to="/login">Sign in</Link>
            </span>
          </p>
        </form>
      </div>
    );
  }
}

export default Register;
