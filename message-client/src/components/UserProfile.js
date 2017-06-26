import React from "react";
import { fetchUser, followUser, unfollowUser } from "../api/index";
import FollowersModal from "./FollowersModal";
import FollowingModal from "./FollowingModal";
import FollowButton from "./FollowButton";
import CurrentUserProfile from "./CurrentUserProfile";
import {
  Button,
  Image,
  Icon,
  Item,
  Loader,
  Divider,
  Grid,
  Container
} from "semantic-ui-react";
import ArticleCard from "./ArticleCard";
export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    fetchUser(this.props.user_id)
      // .then( res => console.log(res))
      .then(user => this.setState({ user: user }));
  }

  componentWillReceiveProps(nextProps) {
    fetchUser(nextProps.user_id).then(user => this.setState({ user: user }));
  }

  handleFollowOrUnfollow(user) {
    //decides when state updates
    this.setState({ user: user });
  }

  render() {
    if (this.props.currentUser === null || this.state.user === null) {
      return <Loader active inline="centered" />;
    } else if (this.state.user.id === this.props.currentUser.id) {
      return (
        <CurrentUserProfile
          handleUpdateUser={this.props.handleUpdateUser}
          user={this.state.user}
        />
      );
    } else {
      const articleCards = this.state.user.articles.map(article =>
        <ArticleCard key={article.id} article={article} />
      );
      return (
        <div>
          <Container text>
            <div className='profileUpper'>
            <Grid columns={6} divided >
              <Grid.Row>
                <Grid.Column width="12">
                  <h1>{this.state.user.username}</h1>
                  <p>{this.state.user.profile}</p>
                </Grid.Column>
                <Grid.Column>
                  <Image src={this.state.user.url} shape="circular" />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <FollowersModal user={this.state.user} />
                </Grid.Column>
                <Grid.Column>
                  <FollowingModal user={this.state.user} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <FollowButton
                    handleChange={this.handleFollowOrUnfollow.bind(this)}
                    currentUser={this.props.currentUser}
                    user={this.state.user}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            </div>
            <Divider fitted/>
          </Container>
          <div className="articleList">
            <Container text>
              <Item.Group divided className='articleCard'>
                {articleCards}
              </Item.Group>
            </Container>
          </div>
        </div>
      );
    }
  }
}
//
