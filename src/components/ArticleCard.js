import React from 'react'
import { Link } from 'react-router-dom'
import { Item, Image } from 'semantic-ui-react'
import {convertFromRaw,
        Editor,
        EditorState,
        createWithContent } from 'draft-js'


export default class ArticleCard extends React.Component {
  render() {
    if (!this.props.article) {
      return null
    } else {
      const raw = JSON.parse(this.props.article.body)
      const snippet = raw.blocks[0].text.substring(0, 100)
    return (
      <Item key={this.props.article.id}>
        <Item.Image size='small' src={require('../assets/missing-image.png')} />
        <Item.Content>
          <Link to={`/articles/${this.props.article.id}`}><Item.Header as='a'>{this.props.article.title}</Item.Header></Link><br/>
          <Link to={`/users/${this.props.article.user.id}`}><Item.Header as='a'><Image src={this.props.article.user.url} avatar/>{this.props.article.user.username}</Item.Header></Link>
          <Item.Description>
            {snippet}...
          </Item.Description>
        </Item.Content>
      </Item>
    )}
  }
}
