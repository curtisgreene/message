import React from 'react'
import FollowersModal from './FollowersModal'
import FollowingModal from './FollowingModal'
import { Button, Item, Divider, Grid } from 'semantic-ui-react'
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
        <h1>{this.state.user.username}</h1>
        <p>{this.state.user.profile}</p>
        <Grid columns={6} divided>
          <Grid.Row>
            <Grid.Column>
              <FollowersModal user={this.props.user}/>
            </Grid.Column>
            <Grid.Column>
              <FollowingModal user={this.props.user}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <UserEditModal onEdit={this.onEdit.bind(this)} handleUpdateUser={this.props.handleUpdateUser} user={this.props.user} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <Item.Group>
          {articleCards}
        </Item.Group>
      </div>
    )
  }
}
