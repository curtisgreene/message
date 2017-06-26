import React from 'react'
import { Button, Input } from 'semantic-ui-react'
import { RichUtils, convertToRaw, Editor } from 'draft-js';

export default class ArticleEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: props.editorState,
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
    this.props.handleEditArticle( this.state.title, raw, this.props.id )
  }

  handleChange(prop, value){
    this.setState({
      [prop]: value
    })
  }

  render() {
    return (
      <div>
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
