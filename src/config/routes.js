import React from "react";
import { Router, Route, browserHistory, IndexRedirect } from "react-router";
import App from "../components/App";
import Login from "../components/Login";
import ProfileContainer from "../containers/ProfileContainer";
import BasicInfo from "../components/BasicInfo";
import FoodPrefs from "../components/FoodPrefs";
import Allergies from "../components/Allergies";
import Friends from '../components/Friends';
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
      <Route path="choose-friends" component={Friends}/>
      <Route path="choose-restaurants" component={Choose}/>
      <Route path="waiting-room" component={WaitingRoom}/>
      <Route path="angle-made" component={AngleMade}/>
      <Route path="profile" component={ProfileContainer}>
        <IndexRedirect to="basic-info" />
        <Route path="basic-info" component={BasicInfo}/>
        <Route path="food-prefs" component={FoodPrefs}/>
        <Route path="allergies" component={Allergies}/>
      </Route>
    </Route>
  </Router>
)

export default routes;
