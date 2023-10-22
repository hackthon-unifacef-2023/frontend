import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { Redirect } from 'react-router';

import CustomRoute from './customRoute';
import Login from '../views/Login';
import Register from '../views/Register';
import Admin from '../views/Admin';
import Organizations from '../views/Organization';

class Router extends Component {
  render() {
    return (
      <Switch>
        <CustomRoute exact path="/login" component={Login} />
        <CustomRoute exact path="/cadastrar" component={Register} />
        <CustomRoute exact path="/admin" component={Admin} isPrivate={true} />
        <CustomRoute exact path="/organizacoes" component={Organizations} isPrivate={true} />

        <Redirect from="*" to={'/login'} />
      </Switch>
    );
  }
}

export default Router;
