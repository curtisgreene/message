import React, { Component } from 'react'
import { Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'


class UserEditForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: props.user.id,
      username: '',
      profile: ''
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit(event){
    event.preventDefault()
    this.props.handleUpdateUser(this.state)
    this.props.closeModal()
  }
  render() {
    const { username, profile } = this.state
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} >
        <Form.Group widths='equal'>
          <Form.Field control={Input} onChange={this.handleChange} label='username' name='username' value={username} placeholder={this.props.user.username} />
        </Form.Group>
        <Form.Field control={TextArea} onChange={this.handleChange} label='profile' name='profile' value={profile} placeholder={this.props.user.profile} />
        <Form.Field control={Button}>Submit</Form.Field>
      </Form>
    )
  }
}

export default UserEditForm
