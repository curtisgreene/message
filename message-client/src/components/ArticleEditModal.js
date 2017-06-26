import React from "react";
import { Button, Input, Container } from "semantic-ui-react";
import { RichUtils, convertToRaw } from "draft-js";
import {
  ImageSideButton,
  Block,
  addNewBlock,
  createEditorState,
  Editor
} from "medium-draft";
import { Modal, Header, Form, Icon } from "semantic-ui-react";
import request from "superagent";

const CLOUDINARY_UPLOAD_PRESET = "qzy5cg1b";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/message-project/image/upload";

class CustomImageSideButton extends ImageSideButton {
  onChange(e) {
    const file = e.target.files[0];

    if (file.type.indexOf("image/") === 0) {
      // This is a post request to server endpoint with image as `image`
      let upload = request
        .post(CLOUDINARY_UPLOAD_URL)
        .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
        .field("file", file);
      upload.end((err, response) => {
        if (response.status === 200) {
          this.props.setEditorState(
            addNewBlock(this.props.getEditorState(), Block.IMAGE, {
              src: response.body.secure_url
            })
          );
        }
      });
    }
    this.props.close();
  }
}

export default class ArticleEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      editorState: props.editorState,
      open: false
    };
    this.onChange = editorState => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sideButtons = [
      {
        title: "Image",
        component: CustomImageSideButton
      }
    ];
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

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

  handleDelete() {
    this.props.handleDeleteArticle(this.props.id)
  }

  handleSubmit() {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const content = this.state.editorState.getCurrentContent();
    // console.log("here is the content: ", content)
    const raw = JSON.stringify(convertToRaw(content));
    this.props.handleEditArticle(this.state.title, raw, this.props.id);
    this.close();
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });
  render() {
    const { open, dimmer } = this.state;
    const { title, body } = this.state;
    // const contentState = convertFromRaw(JSON.parse(this.state.body))
    // const editorState = EditorState.createWithContent(contentState)
    return (
      <div>
        <Button primary onClick={this.show("inverted")}>Edit</Button>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Content image>
            <Modal.Description>
              <Header>Edit</Header>
              <Form>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    onChange={this.handleChange}
                    label="title"
                    name="title"
                    value={title}
                    placeholder={this.props.title}
                  />
                </Form.Group>
                <Container text>
                  <Editor
                    editorState={this.state.editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange}
                    ref="editor"
                    sideButtons={this.sideButtons}
                  />
                </Container>
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              floated="left"
              color="red"
              onClick={this.handleDelete.bind(this)}
            >
              <Icon name="delete" />
              Delete
            </Button>
            <Button onClick={this.handleSubmit.bind(this)} primary>
              Edit <Icon name="right chevron" />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
