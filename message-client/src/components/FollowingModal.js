import React from 'react'
import { Link } from 'react-router-dom'
import { Popup, Button, Header, Image, Modal, Icon, List } from 'semantic-ui-react'

export default class FollowingModal extends React.Component {
  constructor(){
    super()
    this.state = {
      open: false
    }
  }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state
    const followingList =
      this.props.user.following.map( person =>
        <List.Item key={person.id} onClick={this.close}>
          <Image avatar src={person.url} />
          <List.Content>
            <Link to={`/users/${person.id}`}><List.Header as='a'>{person.username}</List.Header></Link>
            <List.Description>{person.profile}</List.Description>
          </List.Content>
        </List.Item>
      )
    return (

      <div>
        <a href="#" onClick={this.show('inverted')}>{this.props.user.following.length} following</a>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>{this.props.user.username} follows:</Modal.Header>
          <Modal.Content >
            <Modal.Description>
              <List>
                {followingList}
              </List>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} primary>
              Close <Icon name='right chevron' />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}
