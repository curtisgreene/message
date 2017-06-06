import React from 'react';
import { Input, Container } from 'semantic-ui-react'

export default class SignUpForm extends React.Component {
  constructor(){
    super()
    this.state = {
      username: '',
      profile: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(prop, value){
    this.setState({
      [prop]: value
    })
  }

  handleSubmit(){
    this.props.onSignUp(this.state.username, this.state.profile)
  }

  render(){
    return(
      <Container text>
        <label>Create a username: </label>
        <Input icon="add user" value={this.state.username} onChange={ e => this.handleChange('username', e.target.value)} placeholder="Username"/><br/>
        <label>Profile: </label>
        <Input fluid placeholder="Profile" value={this.state.profile} onChange={ e => this.handleChange('profile', e.target.value)} />
        <input onClick={this.handleSubmit} type="submit" content="Sign Up"></input>
      </Container>
    )
  }
}
