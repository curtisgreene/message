import React from 'react'
import {convertFromRaw,
        Editor,
        EditorState,
        createWithContent } from 'draft-js'
import { Link } from 'react-router-dom'

export default class ArticleShow extends React.Component {


  render() {
    if (!this.props.article) {
      return null
    } else {
      const contentState = convertFromRaw(JSON.parse(this.props.article.body))
      const editorState = EditorState.createWithContent(contentState)
    return (
      <div>
        <h1>{this.props.article.title}</h1>
        <Link to={`/users/${this.props.article.user.id}`}><h1>{this.props.article.user.username}</h1></Link>
        <Editor editorState={editorState} readOnly="true" />
      </div>
    )}
  }
}
