import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter, Redirect, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

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
        message: 'Recipe successfully deleted.'
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
      <div className="recipe-show">
        <h3 className="recipe-show-title">{recipe.title}</h3>
        <h4 className="recipe-show-description">{recipe.description}</h4>
        <h4 className="recipe-show-base">Ingredients:</h4>
          <div className="recipe-show-div">
          <span className="recipe-show-text-wrap">{recipe.ingredients}</span>
          </div>
        <h4 className="recipe-show-base">Instructions:</h4>
          <div className="recipe-show-div">
          <span className="recipe-show-text-wrap">{recipe.instructions}</span>
          </div>

        <div className="recipe-show-buttons-div">
          <Link className="recipe-show-buttons" to={`/recipes`}>
            <Button variant="dark">Back to Recipes</Button>
          </Link>

          <Link className="recipe-show-buttons" to={`/recipes/${this.props.match.params.id}/edit`}>
            <Button variant="dark" onClick={this.edit}>Edit</Button>
          </Link>

          <Button variant="danger" className="recipe-show-buttons" onClick={this.destroy}>Delete</Button>
        </div>
      </div>
    }
    return (
      recipeJsx
    )
  }
}

export default withRouter(RecipeShow)
