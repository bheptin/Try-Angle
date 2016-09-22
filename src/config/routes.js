import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import App from '../App';
import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';
import ProfileContainer from '../containers/ProfileContainer';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="login" />
      <Route path='login' component={Login} />
      <Route path='signup' component={Signup} />
      <Route path="home" component={Home}/>
      <Route path='profile' component={ProfileContainer}/>
    </Route>
  </Router>
)

export default routes;
