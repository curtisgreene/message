import React from 'react'
import { Link } from 'react-router-dom'
import { Popup, Button, Header, Image, Modal, Icon, Form, TextArea, Input } from 'semantic-ui-react'

export default class UserEditModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: props.user.id,
      username: props.user.username,
      profile: props.user.profile,
      open: false
    }
  }
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit(event){ //optimistically updates the CurrentUserProfile on edit submit
    event.preventDefault()
    this.props.handleUpdateUser(this.state)
    this.props.onEdit({username: this.state.username, profile: this.state.profile})
    this.close()
  }
  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })
  render() {
    const { open, dimmer } = this.state
    const { username, profile } = this.state
    return (
      <div>
        <Button onClick={this.show('inverted')}>Edit</Button>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Content image>
            <Modal.Description>
              <Header>Update your Profile:</Header>
              <Form >
                <Form.Group widths='equal'>
                  <Form.Field control={Input} onChange={this.handleChange} label='username' name='username' value={username} placeholder={this.props.user.username} />
                </Form.Group>
                <Form.Field control={TextArea} onChange={this.handleChange} label='profile' name='profile' value={profile} placeholder={this.props.user.profile} />
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
