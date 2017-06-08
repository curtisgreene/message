import React from 'react'
import { Item, Header, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function ArticlesList(props){

  const articleItems = props.articles.map( article =>
    <Item key={article.id}>
      <Item.Image size='small' src={require('../assets/missing-image.png')} />
      <Item.Content>
        <Link to={`/articles/${article.id}`}><Item.Header as='a'>{article.title}</Item.Header></Link>
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
          Browse Articles
        </Header.Content>
      </Header>
    <h2>You have {props.articles.length} articles</h2>
    <Item.Group>
      {articleItems}
    </Item.Group>
    </div>
  )
}

export default ArticlesList
