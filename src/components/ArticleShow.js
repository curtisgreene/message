import React from 'react'
import {convertFromRaw,
        createWithContent,
        EditorState } from 'draft-js'
import { Editor } from 'medium-draft'
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
  debugger

  onSubmit( title, raw, id ) {
    this.props.handleEditArticle( title, raw, id )
    this.setState({
      title: title,
      body: raw
    })
  }

  handleChange(prop, value) {
    this.setState({
      [prop]: value
    });
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
          <Editor editorState={editorState} editorEnabled={false} onChange={this.handleChange.bind(this)} />
          <ArticleEditModal editorState={editorState} handleEditArticle={this.onSubmit} id={this.props.article.id} title={this.state.title} body={this.state.body} />
        </div>
    )} else {
      const contentState = convertFromRaw(JSON.parse(this.state.body))
      const editorState = EditorState.createWithContent(contentState)
    return (
      <div>
        <h1>{this.state.title}</h1>
        <Link to={`/users/${this.props.article.user.id}`}><h1>{this.state.user.username}</h1></Link>
        <Editor onChange={this.handleChange.bind(this)} editorState={editorState} editorEnabled={false} />
      </div>
    )}
  }
}
