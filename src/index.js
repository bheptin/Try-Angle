import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { IndexRoute, Route } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import ReactStormpath, { Router, Loginlink, AuthenticatedRoute } from 'react-stormpath';



ReactDOM.render(
  <App />,

  document.getElementById('root')
);
