import React from 'react'
import {convertFromRaw,
        Editor,
        EditorState,
        createWithContent } from 'draft-js'

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
        <h1>{this.props.article.user.username}</h1>
        <Editor editorState={editorState} readOnly="true" />
      </div>
    )}
  }
}
