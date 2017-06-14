import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { fetchArticles, createArticle } from '../api/index'
import ArticleShow from '../components/ArticleShow'
import ArticlesList from '../components/ArticlesList'
import NewArticleForm from '../components/NewArticleForm'

class ArticlesContainer extends React.Component {
  constructor(props){
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
    return (
      <Switch>
        <Route exact path="/articles" render={ () => <ArticlesList articles={this.state.articles} />} />
        <Route exact path="/articles/:id" render={ ({match}) => {
          const article = this.state.articles.find(article => article.id === parseInt(match.params.id))
            return <ArticleShow article={article} />
          }
        }/>
        <Route exact path='/articles/new' render={() => <NewArticleForm handleCreateArticle={this.handleCreateArticle}/> } />
      </Switch>
    )
  }
}


export default ArticlesContainer
