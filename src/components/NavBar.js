import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class MenuExampleBasic extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const { activeItem } = this.state

    if (!!localStorage.getItem('jwt')) {
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

          <Link to='/new-message'>
            <Menu.Item
              name='Write'
              active={activeItem === 'write'}
              onClick={this.handleItemClick}
            >
              Write
            </Menu.Item>
          </Link>
          <Link to={`/users/${currentUser.id}`}>
            <Menu.Item
              name='Write'
              active={activeItem === 'profile'}
              onClick={this.handleItemClick}
            >
              Profile
            </Menu.Item>
          </Link>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.props.handleLogOut}
          >
            Log Out
          </Menu.Item>
        </Menu>
      )} else {
        return (
          <Menu>
            <Link to='/signup'>
              <Menu.Item
                name='signup'
                active={activeItem === 'signup'}
                onClick={this.handleItemClick}
              >
                Sign Up
              </Menu.Item>
            </Link>
            <Link to='/login'>
              <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={this.handleItemClick}
              >
                Log In
              </Menu.Item>
            </Link>
        </Menu>
        )
      }

  }
}
