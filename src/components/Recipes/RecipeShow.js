import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter, Redirect } from 'react-router-dom'

class RecipeShow extends Component {
  constructor () {
    super()

    this.state = {
      recipe: null,
      deleted: false
    }
  }

  // Axios call to retrieve the recipe
  componentDidMount () {
    const { user, match, msgAlert } = this.props
    axios({
      url: `${apiUrl}/recipes/${match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
    .then(res => this.setState({ recipe: res.data.recipe }))
    .then(() => {
      msgAlert({
        heading: 'Success!',
        variant: 'success',
        message: 'Showing all recipes'
      })
    })
    .catch((err) => {
      msgAlert({
        heading: 'Uh oh!',
        variant: 'danger',
        message: 'Failed to retrieve recipes due to error: ' + err.message
      })
    })
  }

  // Destroy method to delete recipe
  destroy = () => {
    const { user, match, msgAlert } = this.props
    axios({
      url: `${apiUrl}/recipes/${match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
    .then(() => {
      msgAlert({
        heading: 'Success!',
        variant: 'success',
        message: 'Recipe successfully deleted'
      })
    })
    .then(() => this.setState({ deleted: true }))
  }

  render () {
    const { recipe, deleted } = this.state

    let recipeJsx

    if (!recipe) {
      recipeJsx = "Loading..."
    } else if (deleted) {
      return <Redirect to={`/recipes`} />
    } else {
      recipeJsx =
      <div>
        <h3>{recipe.title}</h3>
        <h4>{recipe.description}</h4>
        <h4>Ingredients: {recipe.ingredients}</h4>
        <h4>Instructions: {recipe.instructions}</h4>
        <button>Edit</button>
        <button onClick={this.destroy}>Delete</button>
      </div>
    }
    return (
      recipeJsx
    )
  }
}

export default withRouter(RecipeShow)
