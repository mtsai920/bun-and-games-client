import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const RecipeCreate = (props) => {
  // Setting state for recipe
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    favorited: false
  })

  const [recipeId, setRecipeId] = useState(null)

  // Deconstructing props to access user
  const { user, msgAlert } = props

  const handleChange = event => {
    event.persist()
    setRecipe(recipe => ({ ...recipe, [event.target.name]: event.target.value}))
  }

  // Axios call for POST
  const handleSubmit = (event) => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/recipes`,
      method: 'POST',
      data: { recipe },
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => setRecipeId(res.data.recipe._id))
      .then(() => msgAlert({
        heading: 'Recipe created!',
        variant: 'success',
        message: messages.createRecipeSuccess
      }))
      .catch((error) => {
        msgAlert({
          heading: 'Failed to create recipe',
          variant: 'danger',
          message: 'Failed due to error: ' + error.message
        })
      })
      .catch(console.error)
  }

  if (recipeId) {
    return <Redirect to={`/recipes`} />
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h2 className="form-title">Create a Recipe</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formHorizontal">
            <Form.Label>Recipe Title</Form.Label>
            <Form.Control
              required
              placeholder="Chocolate Cookies"
              value={recipe.title}
              name="title"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formHorizontal">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              placeholder="Delicious cookies made in the oven"
              value={recipe.description}
              name="description"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Ingredients</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows="3"
              placeholder="1/4 cup of flour"
              value={recipe.ingredients}
              name="ingredients"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Instructions</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows="3"
              placeholder="Combine and bake"
              value={recipe.instructions}
              name="instructions"
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="success" type="submit">Create Recipe</Button>

        </Form>
      </div>
    </div>
  )

}

export default RecipeCreate
