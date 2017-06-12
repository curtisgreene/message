import React from 'react'
import { Button, Input } from 'semantic-ui-react'
import { RichUtils, convertToRaw } from 'draft-js';
import { Editor, createEditorState } from 'medium-draft';

export default class NewArticleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: createEditorState(),
      title: ''
    };
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    this.props.handleCreateArticle( this.state.title, raw, currentUser.id )
  }

  handleChange(prop, value){
    this.setState({
      [prop]: value
    })
  }

  render() {
    return (
      <div>
        <h1>Send a message...</h1>
        <Input value={this.state.title} onChange={ e => this.handleChange('title', e.target.value)} placeholder="Title"/>
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
        <Button onClick={this.handleSubmit}>Submit</Button>
      </div>
    );
  }
}
