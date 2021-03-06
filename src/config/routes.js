import React from "react";
import { Router, Route, browserHistory, IndexRedirect } from "react-router";
import App from "../components/App";
import Login from "../components/Login";
import ProfileContainer from "../containers/ProfileContainer";
import BasicInfo from "../components/BasicInfo";
import FriendsContainer from '../containers/FriendsContainer';
import Choose from '../components/Choose';
import WaitingRoom from '../components/WaitingRoom';
import AngleMade from '../components/AngleMade';
import Invitation from '../components/Invitation';


const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="login" />
      <Route path="login" component={Login} />
      <Route path="invitation" component={Invitation} />
      <Route path="choose-friends" component={FriendsContainer}/>
      <Route path="choose-restaurants" component={Choose}/>
      <Route path="waiting-room" component={WaitingRoom}/>
      <Route path="angle-made" component={AngleMade}/>
      <Route path="profile" component={ProfileContainer}>
        <IndexRedirect to="basic-info" />
        <Route path="basic-info" component={BasicInfo}/>
      </Route>
    </Route>
  </Router>
)

export default routes;
