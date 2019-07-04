import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import '../style/App.css';
import Splash from './Splash';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Profile from './Profile';
import CreateRoute from './CreateRoute';

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
    const config = {
      email: this.state.email,
      password: this.state.password,
    };

    console.log(config);
    axios.post('http://localhost:3030/login', config)
      .then((response) => {
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
          render={Home}
        />
        <Route
          exact
          path="/profile"
          // component={Profile}
          render={(props) => <Profile {...props} name={this.state.firstName} id={this.state.id} />}
        />
        <Route
          exact
          path="/create-route"
          component={CreateRoute}
        />
      </Switch>
    );
  }
}

export default App;
