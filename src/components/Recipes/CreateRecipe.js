import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const CreateRecipe = (props) => {
  // Setting state for recipe
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: [],
    instructions: ''
  })

  const [recipeId, setRecipeId] = useState(null)

  // Deconstructing props to access user
  const { user } = props

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
      .catch(console.error)
  }

  if (recipeId) {
    return <Redirect to={`/recipes/${recipeId}`} />
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Recipe Title</label>
      <input
        placeholder="Chocolate Cookies"
        value={recipe.title}
        name="title"
        onChange={handleChange}
      />

      <label>Description</label>
      <input
        placeholder="Delicious cookies made in the oven"
        value={recipe.description}
        name="description"
        onChange={handleChange}
      />

      <label>Ingredients</label>
      <input
        placeholder="1/4 cup of flour"
        value={recipe.ingredients}
        name="ingredients"
        onChange={handleChange}
      />

      <label>Instructions</label>
      <input
        placeholder="Combine and bake"
        value={recipe.instructions}
        name="instructions"
        onChange={handleChange}
        />

      <button type="submit">Create Recipe</button>

    </form>
  )

}

export default CreateRecipe
