import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import UserProfile from '../components/UserProfile'
import { Button } from 'semantic-ui-react'
import { editUser } from '../api/index'

class UsersContainer extends React.Component {
  constructor(){
    super()
    this.state = {
      currentUser: null
    }
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount(){
    let currentUser = JSON.parse(localStorage.getItem('user'))
    this.setState({
      currentUser: currentUser
    })
  }

  updateUser(user){
    editUser(user)
  }

  render(){
    if ( this.state.currentUser === null ) {
      return <h1>Loading from User container</h1>
    }
    return (
      <Switch>
          <Route exact path='/users/:id' render={ ({match}) => {
          return <UserProfile handleUpdateUser={this.updateUser} user_id={match.params.id} currentUser={this.state.currentUser} />} } />
      </Switch>
    )
  }
}

export default withRouter(UsersContainer)
