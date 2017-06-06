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
    .then(res => this.setState({
      articles: res
    }))
  }

  render(){
    return (
      <div>
        <Container text>
        <MainPage articles={this.state.articles}/>
        </Container>
      </div>
    )
  }
}
