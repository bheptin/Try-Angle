import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import App from '../App';
import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';
import Profile from '../Profile';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="login" />
      <Route path='login' component={Login} />
      <Route path='signup' component={Signup} />
      <Route path='profile' component={Profile} />
      <Route path="home" component={Home}/>
    </Route>
  </Router>
)

export default routes;
