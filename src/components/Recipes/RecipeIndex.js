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
    return (
      <div>
        <h3>You have no recipes yet!</h3>
      </div>
    )
  } else {
    showRecipes = recipes.map(recipe => (
      <div key={recipe._id}>
        <li className="recipe-index">
          <Link className="showLink" to={`/recipes/${recipe._id}`}>{recipe.title}</Link>
          <h4>{recipe.description}</h4>
        </li>
      </div>
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
