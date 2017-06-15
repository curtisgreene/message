import React from 'react'
import { fetchUser, followUser } from '../api/index'
import FollowersModal from './FollowersModal'
import FollowingModal from './FollowingModal'
import CurrentUserProfile from './CurrentUserProfile'
import { Button, Image, Icon, Item } from 'semantic-ui-react'
import ArticleCard from './ArticleCard'
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
    if (this.props.currentUser === null || this.state.user === null ) {
      return <h1>Loading the User Profile</h1>
    } else if (this.state.user.id === this.props.currentUser.id ){
      return (
        <CurrentUserProfile handleUpdateUser={this.props.handleUpdateUser} user={this.state.user} />
      )
    } else {
    const articleCards = this.state.user.articles.map( article => <ArticleCard key={article.id} article={article}/> )
    return (
        <div>
          <h1>Welcome to the Profile Page!</h1>
          <h3>{this.state.user.username}</h3>
          <p>{this.state.user.profile}</p>
          <FollowersModal user={this.state.user}/>
          <FollowingModal user={this.state.user}/>
          <Button type="button" onClick={this.handleFollowUser} primary>Follow</Button>
          <Item.Group>
            {articleCards}
          </Item.Group>
        </div>
      )
    }
  }
}
//
