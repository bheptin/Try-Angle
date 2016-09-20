import React from 'react';
import { render } from 'react-dom';
import routes from './config/routes'
import './index.css';
import { IndexRoute, Route } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import ReactStormpath, { Router, Loginlink, AuthenticatedRoute } from 'react-stormpath';

render(
  routes,

  document.getElementById('root')
);
