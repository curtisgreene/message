import React from 'react'
import FollowersModal from './FollowersModal'
import FollowingModal from './FollowingModal'
import { Button, Item } from 'semantic-ui-react'
import ArticleCard from './ArticleCard'
import UserEditModal from './UserEditModal'

export default class CurrentUserProfile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: {
        username: props.user.username,
        profile: props.user.profile
      }
    }
  }

  onEdit(userObj){
    this.setState({
      user: userObj
    })
  }


  render(){
    const articleCards = this.props.user.articles.map( article => <ArticleCard key={article.id} article={article}/> )
    return (
      <div>
        <h1>Welcome to your Profile Page!</h1>
        <h3>{this.state.user.username}</h3>
        <p>{this.state.user.profile}</p>
        <FollowersModal user={this.props.user}/>
        <FollowingModal user={this.props.user}/>
        <UserEditModal onEdit={this.onEdit.bind(this)} handleUpdateUser={this.props.handleUpdateUser} user={this.props.user} />
        <Item.Group>
          {articleCards}
        </Item.Group>
      </div>
    )
  }
}
