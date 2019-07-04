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
      passwordCheck: '',
      confirmEmail: '',
      emailCheck: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleRegister = (e) => {
    e.preventDefault();
    const { email, confirmEmail, password, confirmPassword } = this.state;
    this.setState({ emailCheck: '', passwordCheck: '' });
    if (email !== confirmEmail) {
      this.setState({ emailCheck: 'Email does not match.' });
    } else if (password !== confirmPassword) {
      this.setState({ passwordCheck: 'Passwords do not match.' });
    } else {
      axios.post('http://localhost:3030/user', {
        firstName: this.state.firstName,
        surname: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      })
        .then(() => {
          this.props.history.push('/login');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    console.log(this.state);
    const {
      confirmPassword, confirmEmail, emailCheck, passwordCheck } = this.state;
    return (
      <div className="user-form">
        <WelcomeHeader />
        <form onSubmit={this.handleRegister}>
          <h2>Register</h2>
          <label>
            <span>
            Name
            </span>
            <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} required />
          </label>
          <label>
            <span>
            Surname
            </span>
            <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} required />
          </label>
          <label>
            <span>
            Email
            </span>
            <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} required />
          </label>
          <label>
            <span>
            Repeat email
            </span>
            <input type="email" name="confirmEmail" value={this.state.confirmEmail} onChange={this.handleInputChange} required />
          </label>
          { emailCheck ? <span>{emailCheck}</span> : ''}
          <label>
            <span>
            Password
            </span>
            <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required />
          </label>
          <label>
            <span>
            Repeat password
            </span>
            <input type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInputChange} required />
          </label>
          { passwordCheck ? <span>{passwordCheck}</span> : ''}
          <button value="Submit" className="action">
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
