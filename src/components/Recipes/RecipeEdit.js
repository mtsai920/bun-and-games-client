import React, { useState, useEffect } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const RecipeEdit = (props) => {
  // Setting state for recipe
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: ''
  })

  // Setting updated state for recipe
  const [updated, setUpdated] = useState(false)

  const { match, user, msgAlert } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/recipes/${match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
    .then(res => setRecipe(res.data.recipe))
    .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setRecipe(recipe => ({ ...recipe, [event.target.name]: event.target.value}))
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/recipes/${match.params.id}`,
      method: 'PATCH',
      data: { recipe },
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
    .then(() => setUpdated(true))
    .then(() => {
      msgAlert({
        heading: 'Success!',
        variant: 'success',
        message: 'Recipe successfully updated.'
      })
    })
    .catch((err) => {
      msgAlert({
        heading: 'Uh oh!',
        variant: 'danger',
        message: 'Unable to update recipe due to error: ' + err.message
      })
    })
  }

  if (updated) {
    return <Redirect to={`/recipes/${props.match.params.id}`} />
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h2 className="form-title">Edit Recipe</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formHorizontal">
            <Form.Label>Recipe Title</Form.Label>
            <Form.Control
              placeholder="Chocolate Cookies"
              value={recipe.title}
              name="title"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formHorizontal">
            <Form.Label>Description</Form.Label>
            <Form.Control
              placeholder="Delicious cookies made in the oven"
              value={recipe.description}
              name="description"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Ingredients</Form.Label>
            <Form.Control
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
            as="textarea"
            rows="3"
            placeholder="Combine and bake"
            value={recipe.instructions}
            name="instructions"
            onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit">Update Recipe</Button>

          <Link className="recipe-show-buttons" to={`/recipes/${match.params.id}`}>
            <Button variant="dark">Back</Button>
          </Link>

        </Form>
      </div>
    </div>
  )
}

export default withRouter(RecipeEdit)
