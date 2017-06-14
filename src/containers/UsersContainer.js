import React from 'react'
import { Switch, Route } from 'react-router-dom'
import UserProfile from '../components/UserProfile'

class UsersContainer extends React.Component {
  constructor(){
    super()
    //state
  }

  render(){
    return (
      <Switch>
          <Route exact path='/users/:id' render={ ({match}) => {
          return <UserProfile user_id={match.params.id} />} } />
      </Switch>
    )
  }
}

export default UsersContainer
