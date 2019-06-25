import React from 'react';
import { Route, Switch } from 'react-router-dom';
import '../style/App.css';
import Splash from './Splash';
import Login from './Login';
import Register from './Register';
import Home from './Home';

const App = () => {
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
    </Switch>
  );
};

export default App;
