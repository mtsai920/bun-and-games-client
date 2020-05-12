import React, { useState, useEffect } from 'react'
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

  const showRecipes = recipes.map(recipe => (
    <li key={recipe._id}>
      <h3>{recipe.title}</h3>
    </li>
  ))

  return (
    <div>
      <ul>
        {showRecipes}
      </ul>
    </div>
  )
}

export default RecipeIndex
