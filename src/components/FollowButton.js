import React from 'react'
import { followUser, unfollowUser } from '../api/index'
import { Button } from 'semantic-ui-react'
// props = currentUser and user thats being shown

export default function FollowButton(props){

  const handleFollowUser = () => {
    console.log("triyng to follow")
    followUser(props.user.id) //from api/index
    // .then( user => console.log(user))
    .then( res => props.handleChange(res) )

  }

  const handleUnfollowUser = () => {
    console.log("triyng to unfollow")
    unfollowUser(props.user.id) //from api/index
    .then( user => props.handleChange(user) )
  }

  let follower_ids = props.user.followers.map( follower => follower.id )
  if (follower_ids.includes(props.currentUser.id)) {
    return (
      <Button animated onClick={handleUnfollowUser} primary>
        <Button.Content visible>Following</Button.Content>
          <Button.Content hidden>Unfollow</Button.Content>
      </Button>
    )
  } else
  return (
      <Button onClick={handleFollowUser} primary>Follow</Button>
  )
}
