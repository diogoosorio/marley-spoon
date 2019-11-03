import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RecipeDetail from '../../components/RecipeDetail'
import { getRecipe } from '../../requests/recipes'

const RecipeDetailContainer = () => {
  const [loading, isLoading] = useState(true)
  const [error, hasError] = useState(null)
  const [response, setResponse] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    getRecipe(id)
      .then(setResponse)
      .catch(() => hasError(true))
      .finally(() => isLoading(false))
  }, [id])

  return <RecipeDetail recipe={response} loading={loading} error={error} />
}

export default RecipeDetailContainer