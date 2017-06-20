import React from 'react'
import { Link } from 'react-router-dom'
import { Popup, Button, Header, Image, Modal, Icon, List } from 'semantic-ui-react'

export default class FollowersModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      followers: props.user.followers
    }
  }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  componentWillReceiveProps(nextProps){
    this.setState({
      followers: nextProps.user.followers
    })
  }

  render() {
    const { open, dimmer } = this.state
    const followersList =
      this.state.followers.map( follower =>
        <List.Item key={follower.id} onClick={this.close}>
          <Image avatar src={follower.url} />
          <List.Content>
            <Link to={`/users/${follower.id}`}><List.Header as='a'>{follower.username}</List.Header></Link>
            <List.Description>{follower.profile}</List.Description>
          </List.Content>
        </List.Item>
      )

    return (

      <div>
        <a href="#" onClick={this.show('inverted')}>{this.state.followers.length} followers</a>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>{this.props.user.username}'s Followers</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <List>
                {followersList}
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
