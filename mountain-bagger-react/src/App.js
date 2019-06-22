import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './style/App.css';
import Login from './Login';
import Splash from './Splash';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) => <Splash {...props} />}
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
