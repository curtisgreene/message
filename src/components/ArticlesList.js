import React from 'react'
import { Item, Header, Icon } from 'semantic-ui-react'
import ArticleCard from './ArticleCard'

function ArticlesList(props){
    const user = JSON.parse(localStorage.getItem('user'))
    const articleCards = props.articles.map( article => <ArticleCard key={article.id} article={article}/> )
    return (
      <div>
        <h1>Do you have a message to send, {user.username}?</h1>
        <Header as='h2' icon textAlign='center'>
          <Icon name='newspaper' circular />
          <Header.Content>
            Browse Articles
          </Header.Content>
        </Header>
      <h2>You have {props.articles.length} articles</h2>
      <Item.Group>
        {articleCards}
      </Item.Group>
      </div>
    )

}

export default ArticlesList
