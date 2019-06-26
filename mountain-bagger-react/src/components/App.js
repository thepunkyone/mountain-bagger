import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../style/App.css';
import Splash from './Splash';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Profile from './Profile';
import CreateRoute from './CreateRoute';
import LocationFinder from './LocationFinder';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      name: 'Richard',
      id: '12345',
    });
  }

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
          render={Login}
        />
        <Route
          exact
          path="/register"
          render={Register}
        />
        <Route
          exact
          path="/home"
          render={Home}
        />
        <Route
          exact
          path="/"
          // component={Profile}
          render={(props) => <Profile {...props} name={this.state.name} id={this.state.id} />}
        />
        <Route
          exact
          path="/create-route"
          component={CreateRoute}
        />
        <Route
          exact
          path="/location-finder"
          component={LocationFinder}
        />
      </Switch>
    );
  }
};

export default App;