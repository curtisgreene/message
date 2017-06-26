import React from "react";
import { Button, Input, Container } from "semantic-ui-react";
import { RichUtils, convertToRaw } from "draft-js";
import {
  ImageSideButton,
  Block,
  addNewBlock,
  createEditorState,
  Editor,
} from 'medium-draft';
import request from "superagent";


const CLOUDINARY_UPLOAD_PRESET = "qzy5cg1b";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/message-project/image/upload";

class CustomImageSideButton extends ImageSideButton {
  onChange(e) {
    const file = e.target.files[0];

    if (file.type.indexOf('image/') === 0) {
      // This is a post request to server endpoint with image as `image`
      let upload = request
        .post(CLOUDINARY_UPLOAD_URL)
        .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
        .field("file", file);
      upload.end((err, response) => {
        if (response.status === 200) {
          this.props.setEditorState(addNewBlock(
            this.props.getEditorState(),
              Block.IMAGE, {
                src: response.body.secure_url,
              }
            ));
          }
        });
      }
    this.props.close();
  }
}

export default class NewArticleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: createEditorState(),
      title: ""
    };
    this.onChange = editorState => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sideButtons = [{
      title: 'Image',
      component: CustomImageSideButton,
    }];
  }

  componentDidMount() {
    this.refs.editor.focus();
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  handleSubmit() {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const content = this.state.editorState.getCurrentContent();
    console.log("here is the content: ", content)
    const raw = JSON.stringify(convertToRaw(content));
    console.log('here is the raw: ', raw)
    this.props.handleCreateArticle(this.state.title, raw, currentUser.id);
  }

  handleChange(prop, value) {
    this.setState({
      [prop]: value
    });
  }

  render() {
    return (
      <div>
        <Container text>
          <Input
            value={this.state.title}
            onChange={e => this.handleChange("title", e.target.value)}
            placeholder="Title"
          />
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            ref="editor"
            sideButtons={this.sideButtons}
          />
          <Button onClick={this.handleSubmit}>Submit</Button>
        </Container>
      </div>
    );
  }
}
