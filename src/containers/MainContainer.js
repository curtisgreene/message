import React from 'react'
import { fetchArticles } from '../api/index'
import MainPage from '../components/MainPage'
import { Container } from 'semantic-ui-react'

export default class MainContainer extends React.Component {
  constructor(){
    super()
    //state
    this.state = {
      articles: []
    }
  }

  componentWillMount(){
    fetchArticles()
    // .then(res => console.log(res))
    .then(res => this.setState({
      articles: res
    }))
  }

  render(){
    if (!!localStorage.getItem('jwt')){
    return (
      <div>
        <Container text>
        <MainPage articles={this.state.articles}/>
        </Container>
      </div>
    )} else {
      return <h1>YOU NEED TO SIGN UP OR IN</h1> ///this could be the landing/about page 
    }
  }
}
