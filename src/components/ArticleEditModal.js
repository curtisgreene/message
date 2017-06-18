import React from 'react'
import {convertFromRaw,
        Editor,
        EditorState,
        createWithContent,
        convertToRaw,
        RichUtils } from 'draft-js'
import { Link } from 'react-router-dom'
import { Popup, Button, Header, Image, Modal, Icon, Form, TextArea, Input } from 'semantic-ui-react'

export default class ArticleEditModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: props.title,
      editorState: props.editorState,
      open: false,
    }
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  handleSubmit(){
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const content = this.state.editorState.getCurrentContent();
    // console.log("here is the content: ", content)
    const raw = JSON.stringify(convertToRaw(content))
    this.props.handleEditArticle( this.state.title, raw, this.props.id )
    this.close()
  }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })
  render() {
    const { open, dimmer } = this.state
    const { title, body } = this.state
    // const contentState = convertFromRaw(JSON.parse(this.state.body))
    // const editorState = EditorState.createWithContent(contentState)
    return (
      <div>
        <Button onClick={this.show('inverted')}>Edit</Button>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Content image>
            <Modal.Description>
              <Header>Edit</Header>
              <Form >
                <Form.Group widths='equal'>
                  <Form.Field control={Input} onChange={this.handleChange} label='title' name='title' value={title} placeholder={this.props.title} />
                </Form.Group>
                <Editor
                  editorState={this.state.editorState}
                  handleKeyCommand={this.handleKeyCommand}
                  onChange={this.onChange}
                />
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleSubmit.bind(this)} primary>
              Edit <Icon name='right chevron' />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}
