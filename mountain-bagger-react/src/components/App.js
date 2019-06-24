import React from 'react';
import { Route, Switch } from 'react-router-dom';
import '../style/App.css';
import Login from './Login';
import Splash from './Splash';

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
    </Switch>
  );
}

export default App;
