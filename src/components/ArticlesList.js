import React from 'react'
import { Item, Header, Icon } from 'semantic-ui-react'


function ArticlesList(props){
  const articleItems = props.articles.map( article =>
    <Item>
      <Item.Image size='small' src={require('../assets/missing-image.png')} />
      <Item.Content>
        <Item.Header as='a'>{article.title}</Item.Header>
        <Item.Description>
          <p>{article.body.substring(0, 300)}</p>
        </Item.Description>
      </Item.Content>
    </Item>
  )



  return (
    <div>
      <Header as='h2' icon textAlign='center'>
        <Icon name='newspaper' circular />
        <Header.Content>
          Welcome to the Articles Container
        </Header.Content>
      </Header>
    <h2>Hello from the articles list. I have {props.articles.length} articles</h2>
    <Item.Group>
      {articleItems}
    </Item.Group>
    </div>
  )
}

export default ArticlesList
