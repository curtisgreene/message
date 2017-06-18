import React from 'react'
import { Link } from 'react-router-dom'
import { Popup, Button, Header, Image, Modal, Icon } from 'semantic-ui-react'

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
        <li onClick={this.close} key={person.id}><Link to={`/users/${person.id}`}>{person.username}</Link></li>
      )
    return (

      <div>
        <a href="#" onClick={this.show('inverted')}>{this.props.user.following.length} following</a>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>{this.props.user.username} follows:</Modal.Header>
          <Modal.Content >
            <Modal.Description>
              <ul>
                {followingList}
              </ul>
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
