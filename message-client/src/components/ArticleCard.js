import React from 'react'
import { Link } from 'react-router-dom'
import { Item, Image, Card } from 'semantic-ui-react'
import {convertFromRaw,
        Editor,
        EditorState,
        createWithContent } from 'draft-js'


export default class ArticleCard extends React.Component {


  pullUrl(article) {
    let body = JSON.parse(article.body)
    let foo = body.blocks.filter( (block) => block.data.src )
    if ( foo.length === 0 ) {
      return require('../assets/missing-image.png')
    } else {
	    return foo[0].data.src
    }
  }

  render() {
    if (!this.props.article) {
      return null
    } else {
      const raw = JSON.parse(this.props.article.body)
      const snippet = raw.blocks[0].text.substring(0, 100)
      let dateTime = new Date(this.props.article.created_at).toLocaleString()
    return (

      <Item key={this.props.article.id} >
        <Item.Image size='small' src={this.pullUrl(this.props.article)} />
        <Item.Content>
          <Link to={`/articles/${this.props.article.id}`}><Item.Header as='a'>{this.props.article.title}</Item.Header></Link><br/>
          <Link to={`/users/${this.props.article.user.id}`}><Item.Header as='a'><Image src={this.props.article.user.url} avatar/>{this.props.article.user.username}</Item.Header></Link>
          <Item.Description>
            {snippet}...
          </Item.Description>
          <Item.Extra>{dateTime}</Item.Extra>
        </Item.Content>
      </Item>

    )}
  }
}
