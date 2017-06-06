import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import SignUpForm from './components/SignUpForm'
import { createUser } from './api/index'
import MainContainer from './containers/MainContainer'
import NavBar from './components/NavBar'

class App extends Component {
  constructor(){
    super()
    this.handleSignUp = this.handleSignUp.bind(this)
  }

  handleSignUp(username, profile){
    createUser(username, profile)
    .then( res => console.log("res from API: ", res))
  }

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path='/signup' render={ () => <SignUpForm onSignUp={this.handleSignUp}/>} />
          <Route path='/' component={ MainContainer} />
        </Switch>
      </div>
    );
  }
}

export default App;
