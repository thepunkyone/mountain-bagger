import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Profile from './Profile';
import CreateRoute from './CreateRoute';
import '../styles/App.css';

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
      <Fragment>
        <Switch>
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
        </Switch>
      </Fragment>
    );
  }


}

export default App;
