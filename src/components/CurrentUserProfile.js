import React from 'react'
import FollowersModal from './FollowersModal'
import FollowingModal from './FollowingModal'


export default class CurrentUserProfile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: {
        username: props.currentUser.username,
        profile: props.currentUser.profile
      }
    }
  }

  render(){

    return (
      <div>
        <h1>Welcome to your Profile Page!</h1>
        <h3>{this.state.user.username}</h3>
        <p>{this.state.user.profile}</p>
        <FollowersModal user={this.props.currentUser}/>
        <FollowingModal user={this.props.currentUser}/>
      </div>
    )
  }
}
