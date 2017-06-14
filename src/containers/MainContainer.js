import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import ArticlesContainer from '../containers/ArticlesContainer'
import UsersContainer from '../containers/UsersContainer'

class MainContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      articles: []
    }
  }

  render(){
    if (!!localStorage.getItem('jwt')){
    return (
      <Container text>
        <Switch>
          <Route path="/articles" render={ () => <ArticlesContainer /> } />
          <Route path='/users' render={ () => <UsersContainer currentUser={this.props.currentUser}/> } />
        </Switch>
      </Container>
    )} else {
      return <h1>YOU NEED TO SIGN UP OR IN</h1> ///this could be the landing/about page
    }
  }
}

export default withRouter(MainContainer)
