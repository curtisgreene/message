import React from "react";
import { Link } from "react-router-dom";
import {
  Popup,
  Button,
  Header,
  Image,
  Modal,
  Icon,
  Form,
  TextArea,
  Input
} from "semantic-ui-react";
import Dropzone from "react-dropzone";
import request from "superagent";

const CLOUDINARY_UPLOAD_PRESET = "qzy5cg1b";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/message-project/image/upload";

export default class UserEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.user.id,
      username: props.user.username,
      profile: props.user.profile,
      open: false,
      uploadedFileCloudinaryUrl: props.user.url
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit(event) {
    //optimistically updates the CurrentUserProfile on edit submit
    event.preventDefault();
    if (this.state.uploadedFileCloudinaryUrl !== "") {
      this.props.handleUpdateUser({
        id: this.state.id,
        username: this.state.username,
        profile: this.state.profile,
        url: this.state.uploadedFileCloudinaryUrl
      });
      this.props.onEdit({
        username: this.state.username,
        profile: this.state.profile,
        url: this.state.uploadedFileCloudinaryUrl
      })
      console.log("sending with url:", this.state)
    } else {
      this.props.handleUpdateUser({
        id: this.state.id,
        username: this.state.username,
        profile: this.state.profile,
      });
      this.props.onEdit({
        username: this.state.username,
        profile: this.state.profile,
      })
      console.log("sending without url:", this.state)
    }
    this.close();
  }
  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });
  render() {
    const { open, dimmer } = this.state;
    const { username, profile } = this.state;
    return (
      <div>
        <Button onClick={this.show("inverted")}>Edit</Button>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Content image>
            <Modal.Description>
              <Header>Update your Profile:</Header>
              <Form>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    onChange={this.handleChange}
                    label="username"
                    name="username"
                    value={username}
                    placeholder={this.props.user.username}
                  />
                </Form.Group>
                <Form.Field
                  control={TextArea}
                  onChange={this.handleChange}
                  label="profile"
                  name="profile"
                  value={profile}
                  placeholder={this.props.user.profile}
                />
              </Form>
              <Dropzone
                multiple={false}
                accept="image/*"
                onDrop={this.onImageDrop.bind(this)}
              >
                <p>Drop an image or click to select a file to upload.</p>
              </Dropzone>
              <div>
                {this.state.uploadedFileCloudinaryUrl === this.props.user.url
                  ? null
                  : <div>
                      <p>{this.state.uploadedFile.name}</p>
                      <img src={this.state.uploadedFileCloudinaryUrl} />
                    </div>}
              </div>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleSubmit.bind(this)} primary>
              Edit <Icon name="right chevron" />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
