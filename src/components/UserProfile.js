import React from 'react'
import { fetchUser } from '../api/index'
import { Link } from 'react-router-dom'
export default class UserProfile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: null
    }
  }

  componentDidMount(){
    fetchUser(this.props.user_id)
    .then( user => this.setState({ user: user }))
  }

  componentWillReceiveProps(nextProps){
    fetchUser(nextProps.user_id)
    .then( user => this.setState({ user: user }))
  }

  render(){
    const currentUser = JSON.parse(localStorage.getItem('user'))
    if (this.state.user === null) {
      return null
    } else if (this.state.user.id === parseInt(currentUser.id)){
      return (
        <h1>This is your profile, {this.state.user.username}!</h1>
      )
    } else {
      return (
        <div>
          <h1>Welcome to the Profile Page!</h1>
          <h3>{this.state.user.username}</h3>
          <p>{this.state.user.profile}</p>
          <p>{this.state.user.articles.length}</p>
          <ul>
          {this.state.user.articles.map( article =>
            <li key={article.id}><Link to={`/articles/${article.id}`}>{article.title}</Link></li>
          )}
          </ul>
        </div>
      )
    }
  }
}
