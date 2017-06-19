import React from 'react';
import { Input, Container, Button, Icon, Form, Message, Grid } from 'semantic-ui-react'

export default class LogInForm extends React.Component {
  constructor(){
    super()
    this.state = {
      accountName: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(prop, value){
    this.setState({
      [prop]: value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onLogIn(this.state)
  }

  render(){
    return(
      <Container text>
        <Grid columns={1}>
          <Grid.Row centered={true} width='8'>
            <Message
              attached
              header='This is Message'
              content='Please login below to send your message'
            />
            <Form className='attached fluid segment'>
              <Form.Group widths='equal'>
                <Form.Input label='Account Name'icon="add user" value={this.state.accountName} onChange={ e => this.handleChange('accountName', e.target.value)} placeholder="Account Name"/><br/>
                <Form.Input label='Password' type="password" placeholder="Password" value={this.state.password} onChange={ e => this.handleChange('password', e.target.value)} />
              </Form.Group>
            <Form.Button onClick={this.handleSubmit.bind(this)} primary>
              Login<Icon name='right chevron' />
            </Form.Button>
            </Form>
        </Grid.Row>
      </Grid>
      </Container>
    )
  }
}
