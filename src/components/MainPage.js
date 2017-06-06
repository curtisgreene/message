import React from 'react'
import ArticlesList from './ArticlesList'
import { Switch, Route } from 'react-router-dom'


function MainPage(props){
  return (
    <div>
      <Switch>
        <Route path="/" render={() => <ArticlesList articles={props.articles}/>} />
      </Switch>
    </div>
  )
}


export default MainPage
