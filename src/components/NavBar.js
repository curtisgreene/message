import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class MenuExampleBasic extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Link to="/">
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          >
            Home
          </Menu.Item>
        </Link>

        <Link to='/signup'>
          <Menu.Item
            name='profile'
            active={activeItem === 'profile'}
            onClick={this.handleItemClick}
          >
            Profile
          </Menu.Item>
        </Link>

        <Link to='/new-message'>
          <Menu.Item
            name='Write'
            active={activeItem === 'write'}
            onClick={this.handleItemClick}
          >
            Write
          </Menu.Item>
        </Link>
      </Menu>
    )
  }
}
