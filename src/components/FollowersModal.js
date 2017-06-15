import React from 'react'
import { Link } from 'react-router-dom'
import { Popup, Button, Header, Image, Modal, Icon } from 'semantic-ui-react'

export default class FollowersModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false
    }
  }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state
    const followersList =
      this.props.user.followers.map( follower =>
        <li onClick={this.close} key={follower.id}><Link to={`/users/${follower.id}`}>{follower.username}</Link></li>
      )
    return (

      <div>
        <a href="#" onClick={this.show('inverted')}>{this.props.user.followers.length} followers</a>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>{this.props.user.username}'s Followers</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src={require('../assets/missing-image.png')} />
            <Modal.Description>
              <Header>Followers</Header>
              <ul>
                {followersList}
              </ul>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button primary>
              Proceed <Icon name='right chevron' />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}
