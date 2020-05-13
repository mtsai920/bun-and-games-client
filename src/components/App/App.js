import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import RecipeCreate from '../Recipes/RecipeCreate'
import RecipeShow from '../Recipes/RecipeShow'
import RecipeIndex from '../Recipes/RecipeIndex'
import RecipeEdit from '../Recipes/RecipeEdit'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create-recipe' render={() => (
            <RecipeCreate msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path="/recipes/:id" render={() => (
            <RecipeShow msgAlert={this.msgAlert} user={user} match={this.props.params}/>
          )} />
          <AuthenticatedRoute user={user} exact path="/recipes" render={() => (
            <RecipeIndex msgAlert={this.msgAlert} user={user}/>
          )}/>
          <AuthenticatedRoute user={user} exact path="/recipes/:id/edit" render={() => (
            <RecipeEdit msgAlert={this.msgAlert} user={user} match={this.props.params}/>
          )}/>
        </main>
        <body className="home">
        </body>
      </Fragment>
    )
  }
}

export default App
