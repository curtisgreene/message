import React from 'react'
import { fetchUser, followUser } from '../api/index'
import FollowersModal from './FollowersModal'
import FollowingModal from './FollowingModal'
import CurrentUserProfile from './CurrentUserProfile'
import { Link } from 'react-router-dom'
import { Button, Image, Icon } from 'semantic-ui-react'
export default class UserProfile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: null
    }
    this.handleFollowUser = this.handleFollowUser.bind(this)
  }

  componentDidMount(){
    fetchUser(this.props.user_id)
    .then( user => this.setState({ user: user }))
  }

  componentWillReceiveProps(nextProps){
    fetchUser(nextProps.user_id)
    .then( user => this.setState({ user: user }))
  }

  handleFollowUser(){
    console.log("triyng to follow")
    followUser(this.state.user.id) //from api/index
    // .then( user => this.setState({ user: user }))
  }

  render(){
    const currentUser = JSON.parse(localStorage.getItem('user'))
    if (this.state.user === null) {
      return null
    } else if (this.state.user.id === parseInt(currentUser.id)){
      return (
        <CurrentUserProfile currentUser={this.state.user} />
      )
    } else {
      const followingList =
        this.state.user.following.map( person =>
          <li key={person.id}><Link to={`/users/${person.id}`}>{person.username}</Link></li>
        )
      return (
        <div>
          <h1>Welcome to the Profile Page!</h1>
          <h3>{this.state.user.username}</h3>
          <p>{this.state.user.profile}</p>
          <FollowersModal user={this.state.user}/>
          <FollowingModal user={this.state.user}/>
          <Button type="button" onClick={this.handleFollowUser} primary>Follow</Button>
        </div>
      )
    }
  }
}
//
