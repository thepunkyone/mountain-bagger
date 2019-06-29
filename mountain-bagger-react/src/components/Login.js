import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/user-form-page.scss';
import WelcomeHeader from './WelcomeHeader';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleLogin = () => {
    axios.post('', {
      email: this.state.email,
      password: this.state.password,
    })
      .then((response) => {
        this.props.onLogin(response.data);
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data.message });
      });
  };

  render() {
    return (
      <div className="user-form">
        <WelcomeHeader />
        <form>
          <h2>Sign in</h2>
          <label>
            <span>
            Email
            </span>
            <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
          </label>
          <label>
            <span>
            Password
            </span>
            <input type="text" name="password" value={this.state.password} onChange={this.handleInputChange} />
          </label>
          <button value="Submit" className="action" onClick={this.handleLogin}>
          Sign in
          </button>
          {
          this.state.errorMessage &&
          <div><span>{this.state.errorMessage}</span></div>
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
  }
}

export default Login;
