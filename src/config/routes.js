import React from 'react';
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router';
import App from '../App';
import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/login" />
      <Route path="login" component={Login}/>
      <Route path="signup" component={Signup}/>
      <Route path="home" component={Home}/>
    </Route>
  </Router>
)

export default routes;
