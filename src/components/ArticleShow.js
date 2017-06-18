import React from 'react'
import {convertFromRaw,
        Editor,
        EditorState,
        createWithContent } from 'draft-js'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import ArticleEditForm from './ArticleEditForm'
import ArticleEditModal from './ArticleEditModal'

export default class ArticleShow extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: props.article.title,
      body: props.article.body,
      user: props.article.user
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit( title, raw, id ) {
    this.props.handleEditArticle( title, raw, id )
    this.setState({
      title: title,
      body: raw
    })
  }

  render() {
    if (!this.props.article) {
      return null
    } else if (this.state.user.id === JSON.parse(localStorage.getItem('user')).id) {
      const contentState = convertFromRaw(JSON.parse(this.state.body))
      const editorState = EditorState.createWithContent(contentState)
      return (
        <div>
          <h1>{this.state.title}</h1>
          <Link to={`/users/${this.props.article.user.id}`}><h1>{this.state.user.username}</h1></Link>
          <Editor editorState={editorState} readOnly="true" />
          {/* <ArticleEditForm editorState={editorState} handleEditArticle={this.onSubmit} id={this.props.article.id} title={this.state.title} body={this.state.body} /> */}
          <ArticleEditModal editorState={editorState} handleEditArticle={this.onSubmit} id={this.props.article.id} title={this.state.title} body={this.state.body} />
        </div>
    )} else {
      const contentState = convertFromRaw(JSON.parse(this.state.body))
      const editorState = EditorState.createWithContent(contentState)
    return (
      <div>
        <h1>{this.state.title}</h1>
        <Link to={`/users/${this.props.article.user.id}`}><h1>{this.state.user.username}</h1></Link>
        <Editor editorState={editorState} readOnly="true" />
      </div>
    )}
  }
}
