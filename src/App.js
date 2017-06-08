import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import SignUpForm from './components/SignUpForm'
import { createAccount, logIn } from './api/index'
import MainContainer from './containers/MainContainer'
import NavBar from './components/NavBar'
import LogInForm from './components/LogInForm'

class App extends Component {
  constructor(){
    super()
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleLogIn = this.handleLogIn.bind(this)
  }

  handleSignUp(params){
    createAccount(params)
    .then( res => console.log("res from API: ", res))
  }

  handleLogIn(params) {
    logIn(params)
    .then( res => {
      localStorage.setItem('jwt', res.token)
    })
    .then( () => this.props.history.push('/'))
  }

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path='/signup' render={ () => <SignUpForm onSignUp={this.handleSignUp}/>} />
          <Route path='/login' render={ () => <LogInForm onLogIn={this.handleLogIn}/>} />
          <Route path='/' component={ MainContainer} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
