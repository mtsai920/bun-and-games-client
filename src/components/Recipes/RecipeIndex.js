import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'

const RecipeIndex = (props) => {
  const [recipes, setRecipes] = useState([])

  const [favorited, setFavorited] = useState(false)

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

  const toggleFavorited = () => {
    return { favorited: setFavorited(!favorited) }
  }

  let showRecipes

  if (recipes.length === 0) {
    return (
      <div className="no-recipes">
        <h3>You have no recipes yet!</h3>
      </div>
    )
  }

    showRecipes = recipes.map(recipe => (
      <div className="recipe-index" key={recipe._id}>
          <Link className="showLink" to={`/recipes/${recipe._id}`}>{recipe.title}</Link>
          <h4 className="recipe-index-description">{recipe.description}</h4>
          <div className="favorite-button">
            <Button onClick={toggleFavorited} variant="dark">
              {favorited ? 'FAVORITED' : 'FAVORITE' }
            </Button>
          </div>
        <hr />
      </div>
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
