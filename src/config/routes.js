import React from "react";
import { Router, Route, browserHistory, IndexRedirect } from "react-router";
import App from "../components/App";
import Home from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ProfileContainer from "../containers/ProfileContainer";
import BasicInfo from "../components/BasicInfo";
import FoodPrefs from "../components/FoodPrefs";
import Allergies from "../components/Allergies";

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="login" />
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="home" component={Home}/>
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
