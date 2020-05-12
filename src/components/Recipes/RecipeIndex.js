import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const RecipeIndex = (props) => {
  const [recipes, setRecipes] = useState([])

  const { user } = props

  useEffect(() => {
    axios({
      url: `${apiUrl}/recipes`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(res => setRecipes(res.data.recipes))
      .catch(console.error)
  }, [])

  let showRecipes

  if (!recipes) {
    showRecipes = "You have no recipes yet!"
  } else {
    showRecipes = recipes.map(recipe => (
      <li key={recipe._id}>
        <Link className="showLink" to={`/recipes/${recipe._id}`}>{recipe.title}</Link>
        <h4>{recipe.description}</h4>
      </li>
    ))
  }

  return (
    <div>
      <ul>
        {showRecipes}
      </ul>
    </div>
  )
}

export default RecipeIndex
