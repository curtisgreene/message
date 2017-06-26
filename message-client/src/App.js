import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import { createAccount, logIn, fetchUser } from "./api/index";
import ArticlesContainer from "./containers/ArticlesContainer";
import UsersContainer from "./containers/UsersContainer";
import CustomImageEditor from "./components/staging/CustomImageEditor";
import NavBar from "./components/NavBar";
import LogInForm from "./components/LogInForm";
import { Container } from "semantic-ui-react";
import "./App.css";
class App extends Component {
  constructor() {
    super();
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.state = {
      currentUser: null
    };
  }

  handleSignUp(params) {
    console.log(params);
    createAccount(params).then(() =>
      this.handleLogIn({
        accountName: params.account.username,
        password: params.account.password
      })
    );
  }

  handleLogIn(params) {
    console.log(params);
    logIn(params)
      .then(res => {
        if (!!res.error) {
          alert("Username or password incorrect.");
          this.props.history.push("/login");
        } else {
          localStorage.setItem("jwt", res.token);
          localStorage.setItem("user", JSON.stringify(res.user));
          this.setState({ currentUser: res.user });
        }
      })
      .then(() => {
        if (!!localStorage.getItem("jwt")) {
          this.props.history.push("/articles");
        }
      });
  }

  componentDidMount() {
    if (!!localStorage.getItem("user") && !this.state.currentUser) {
      fetchUser(JSON.parse(localStorage.getItem("user")).id).then(res =>
        this.setState(prevState => {
          currentUser: res;
        })
      );
    }
  }

  handleLogOut() {
    localStorage.clear();
    this.props.history.push("/login");
  }

  render() {
    return (
      <div>
        <NavBar handleLogOut={this.handleLogOut} />
        <Switch>
          <Route
            exact
            path="/signup"
            render={() => <SignUpForm onSignUp={this.handleSignUp} />}
          />
          <Route
            exact
            path="/login"
            render={() => <LogInForm onLogIn={this.handleLogIn} />}
          />
          <Route
            path="/articles"
            render={() =>
              <ArticlesContainer currentUser={this.state.currentUser} />}
          />
          <Route
            path="/users"
            render={() =>
              <UsersContainer currentUser={this.state.currentUser} />}
          />
          <Route path="/staging" render={() => <CustomImageEditor />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
