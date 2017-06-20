import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { fetchArticles, createArticle, editArticle } from '../api/index'
import ArticleShow from '../components/ArticleShow'
import ArticlesList from '../components/ArticlesList'
import NewArticleForm from '../components/NewArticleForm'
import ArticleEditForm from '../components/ArticleEditForm'
import { Loader } from 'semantic-ui-react'

class ArticlesContainer extends React.Component {
  constructor(props){
    super()
    this.state = {
      articles: null
    }
    this.handleCreateArticle = this.handleCreateArticle.bind(this)
    this.handleEditArticle = this.handleEditArticle.bind(this)
  }

  componentDidMount(){
    fetchArticles()
    .then(res => this.setState({
      articles: res.articles
    }))
  }

  handleCreateArticle(title, body, id){
    createArticle(title, body, id)
    .then( () => this.props.history.push('/articles'))
  }

  handleEditArticle(title, body, id){
    editArticle(title, body, id)
    .then( res => console.log("response from the server: ", res) )
  }

  render(){
    if (!this.state.articles) {
      return <Loader active inline='centered'/>
    } else {
      let id = JSON.parse(localStorage.getItem('user')).id
      let feedArticles = this.state.articles.filter( article => article.user.id !== id )
      return (
        <Switch>
          <Route exact path='/articles/new' render={() => <NewArticleForm handleCreateArticle={this.handleCreateArticle}/> } />
          <Route exact path="/articles" render={ () => <ArticlesList articles={feedArticles} />} />
          <Route exact path="/articles/:id" render={ ({match}) => {
            const article = this.state.articles.find(article => article.id === parseInt(match.params.id))
              return <ArticleShow handleEditArticle={this.handleEditArticle} article={article} />
            }
          }/>
          <Route exact path="/articles/:id/edit" render={ ({match}) => {
            const article = this.state.articles.find(article => article.id === parseInt(match.params.id))
              return <ArticleEditForm handleEditArticle={this.handleEditArticle} article={article} />
            }
          }/>
      </Switch>
    )
  }
  }
}


export default withRouter(ArticlesContainer)
