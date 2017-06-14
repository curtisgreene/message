import React from 'react'
import { withRouter } from 'react-router-dom'
import { fetchArticles, createArticle } from '../api/index'
import MainPage from '../components/MainPage'
import { Container } from 'semantic-ui-react'

class MainContainer extends React.Component {
  constructor(){
    super()
    this.state = {
      articles: []
    }
    this.handleCreateArticle = this.handleCreateArticle.bind(this)
  }

  componentDidMount(){
    fetchArticles()
    .then(res => this.setState({
      articles: res.articles
    }))
  }

  handleCreateArticle(title, body, id){
    createArticle(title, body, id)
    .then(res => console.log("response from the api: ", res) )
    .then( () => this.props.history.push('/'))
  }

  render(){
    if (!!localStorage.getItem('jwt')){
    return (
      <div>
        <Container text>
        <MainPage handleCreateArticle={this.handleCreateArticle} currentUser={this.props.currentUser} articles={this.state.articles} />
      </Container>
      </div>
    )} else {
      return <h1>YOU NEED TO SIGN UP OR IN</h1> ///this could be the landing/about page
    }
  }
}

export default withRouter(MainContainer)
