import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Redirect, withRouter } from 'react-router-dom'

const RecipeShow = (props) => {
  // Setting state for single recipe
  const [recipe, setRecipe] = useState()
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    const { match } = props
    axios(`${apiUrl}/recipes/${match.params._id}`)
      .then(res => setRecipe(res.data.recipe))
      .catch(console.error)
  })

  if (!recipe) {
    return <p>This recipe does not exist!</p>
  }

  if (deleted) {
    return <Redirect to={`/recipes`} />
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <p>{recipe.instructions}</p>
    </div>
  )
}

export default withRouter(RecipeShow)
