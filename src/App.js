import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import SignUpForm from './components/SignUpForm'
import { createAccount, logIn, fetchUser } from './api/index'
import MainContainer from './containers/MainContainer'
import NavBar from './components/NavBar'
import LogInForm from './components/LogInForm'

class App extends Component {
  constructor(){
    super()
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleLogIn = this.handleLogIn.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
    this.state = {
      currentUser: null
    }
  }

  handleSignUp(params){
    createAccount(params)
    .then( res => console.log("res from API: ", res))
  }

  handleLogIn(params) {
    logIn(params)
    .then( res => {
      localStorage.setItem('jwt', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))
      this.setState({ currentUser: res.user })
    })
    .then( () => this.props.history.push('/articles'))
  
  }

  componentDidMount(){
      if (!!localStorage.getItem('user') && !this.state.currentUser) {
        fetchUser(JSON.parse(localStorage.getItem('user')).id)
        .then( res => this.setState( prevState => { currentUser: res } ) )
      }
  }

  handleLogOut(){
    localStorage.clear()
  }

  render() {
    return (
      <div>
        <NavBar handleLogOut={this.handleLogOut}/>
        <Switch>
          <Route path='/signup' render={ () => <SignUpForm onSignUp={this.handleSignUp}/>} />
          <Route path='/login' render={ () => <LogInForm onLogIn={this.handleLogIn}/>} />
          <Route path='/' render={ () =>  <MainContainer currentUser={this.state.currentUser}/>} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
