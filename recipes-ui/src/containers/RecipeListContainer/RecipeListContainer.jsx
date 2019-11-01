import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { generatePath } from 'react-router-dom'
import Routes from '../../constants/routes'
import RecipeList from '../../components/RecipeList'
import { listRecipes } from '../../requests/recipes'

const parsePageParameter = (query) => {
  const parsedParams = new URLSearchParams(query)
  const pageParam = parsedParams.has('page') ? parsedParams.get('page') : 1
  const parsedParam = parseInt(pageParam, 10)

  return Number.isNaN(parsedParam) ? 1 : parsedParam
}

const RecipesListContainer = ({ history, location }) => {
  const [loading, isLoading] = useState(true)
  const [error, hasError] = useState(null)
  const [response, setResponse] = useState(null)
  const [page, setPage] = useState(parsePageParameter(location.search))

  const onPageChange = (newPage) => {
    history.push({
      pathname: generatePath(Routes.RECIPE_LIST),
      search: `?page=${newPage}`
    })

    isLoading(true)
    setPage(newPage)
  }

  useEffect(() => {
    listRecipes({ page })
      .then(setResponse)
      .catch(() => hasError(true))
      .finally(() => isLoading(false))
  }, [page])


  return <RecipeList data={response} setPage={onPageChange} error={error} loading={loading} />
}

RecipesListContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired
}

export default RecipesListContainer