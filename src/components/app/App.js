import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";

import "./App.css";
import Navbar from "../nav/Navbar";
import Home from "../home/Home";
import Register from "../auth/Register";
import Login from "../auth/Login";
import PostAd from "../profile/PostAd";

import { logout } from "../../actions/auth";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({ currentUser: user });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    return (
      <div className="App">
        <Navbar logOut={this.logOut} />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/postad" render={() => <PostAd />} />
          <Route exact path="/register" render={() => <Register />} />
          <Route path="/login" render={(props) => <Login {...props} />} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default withRouter(connect(mapStateToProps)(App));
