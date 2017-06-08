import React from 'react'
import ArticlesList from './ArticlesList'
import ArticleShow from './ArticleShow'
import NewArticleForm from './NewArticleForm'
import { Switch, Route } from 'react-router-dom'


function MainPage(props){
  return (
    <Switch>
      <Route exact path="/articles/:id" render={ ({match}) => {
        const article = props.articles.find(article => article.id === parseInt(match.params.id))
        return <ArticleShow article={article} />
      } }/>
      <Route exact path='/new-message' render={() => <NewArticleForm /> } />
      <Route path="/" render={() => <ArticlesList articles={props.articles}/>} />
    </Switch>
  )
}


export default MainPage
