import httpClient from './httpClient'
import Media from '../constants/media'

const TITLE_REGEXP = /\t/g
const DEFAULT_PAGE_SIZE = parseInt(process.env.REACT_APP_DEFAULT_PAGE_SIZE || 10, 10)

const mapRecipe = (recipe) => ({
  id: recipe.id,
  title: (recipe.title || '').replace(TITLE_REGEXP, " "),
  description: recipe.description,
  photo: recipe.photo_url || Media.DEFAULT_IMAGE,
  chef: recipe.chef_name,
  tags: recipe.tag_names
})

export const listRecipes = async ({ page = 1, pageSize = DEFAULT_PAGE_SIZE } = {}) => {
  const limit = pageSize
  const skip = (page - 1) * pageSize

  const response = await httpClient.get(`/recipes?skip=${skip}&limit=${limit}`)

  return {
    page,
    pageSize,
    totalPages: Math.ceil(response.data.total / response.data.limit),
    totalRecipes: response.data.total,
    recipes: response.data.resources.map(mapRecipe)
  }
}

export const getRecipe = async (id) => httpClient.get(`/recipes/${id}`)
  .then((response) => mapRecipe(response.data))
  .catch((error) => {
    if (error.response && error.response.status === 404) {
      return null
    }

    throw error
  })
