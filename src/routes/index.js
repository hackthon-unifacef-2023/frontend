import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { Redirect } from 'react-router';

import CustomRoute from './customRoute';
import Login from '../views/Login';
import Register from '../views/Register';

class Router extends Component {
  render() {
    return (
      <Switch>
        <CustomRoute exact path="/login" component={Login} />
        <CustomRoute exact path="/cadastrar" component={Register} />

        <Redirect from="*" to={'/login'} />
      </Switch>
    );
  }
}

export default Router;
