import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../style/App.css';
import Splash from './Splash';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Profile from './Profile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      email: '',
      password: '',
      id: '',
      firstName: '',
    });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3030/login', {
      email: this.state.email,
      password: this.state.password,
    })
      .then((response) => {
        console.log(response)
        this.setState({ id: response.data.userId, firstName: response.data.firstName });
        // this.props.history.push('/profile');
      })
      .catch((error) => {
        console.log(error, 'error catch');
      });
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={Splash}
        />
        <Route
          exact
          path="/login"
          render={(props) => (this.state.id ? <Redirect to="/profile" /> : <Login {...props} handleInputChange={this.handleInputChange} handleLogin={this.handleLogin} />)}
        />
        />
        <Route
          exact
          path="/register"
          component={Register}
        />
        <Route
          exact
          path="/home"
          render={(props) => <Home {...props} name={this.state.name} id={this.state.id} />}
        />
        <Route
          exact
          path="/profile"
          render={(props) => <Profile {...props} name={this.state.name} id={this.state.id} />}
        />
      </Switch>
    );
  }
}

export default App;
