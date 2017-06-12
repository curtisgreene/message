import React from 'react'
import { Link } from 'react-router-dom'
import { Item } from 'semantic-ui-react'
import {convertFromRaw,
        Editor,
        EditorState,
        createWithContent } from 'draft-js'


export default class ArticleCard extends React.Component {
  render() {
    if (!this.props.article) {
      return null
    } else {
      const contentState = convertFromRaw(JSON.parse(this.props.article.body))
      const editorState = EditorState.createWithContent(contentState)
    return (
      <Item key={this.props.article.id}>
        <Item.Image size='small' src={require('../assets/missing-image.png')} />
        <Item.Content>
          <Link to={`/articles/${this.props.article.id}`}><Item.Header as='a'>{this.props.article.title}</Item.Header></Link><br/>
          <Link to={`/users/${this.props.article.user.id}`}><Item.Header as='a'>{this.props.article.user.username}</Item.Header></Link>
          <Item.Description>
            <Editor editorState={editorState} readOnly="true" />
          </Item.Description>
        </Item.Content>
      </Item>
    )}
  }
}
