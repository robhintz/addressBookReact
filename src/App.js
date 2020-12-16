import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import DistanceComponent from "./Components/DistanceComponent";
import LoginAccount from "./Components/LoginAccount";
import Main from "./Components/Main";
import Navbar from "./Components/Navbar";
import NewAccount from "./Components/NewAccount";

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/createAccount">
            <NewAccount />
          </Route>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/login">
            <LoginAccount />
          </Route>
          <Route exact path="/distance">
            <DistanceComponent />
          </Route>
        </Switch>
      </div>
    );
  }
}
