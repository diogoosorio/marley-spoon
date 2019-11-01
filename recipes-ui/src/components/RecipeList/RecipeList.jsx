import React from 'react'
import PropTypes from 'prop-types'
import { Pagination } from 'antd'
import { ErrorPage } from '../ErrorPages'
import RecipeListItem from '../RecipeListItem'
import withLoading from '../Loading'
import './RecipeList.css'

const RecipeList = ({ data, setPage }) => {
  if (data.totalRecipes === 0) {
    return (
      <ErrorPage
        title="No Recipes Found"
        description="We sorry, it appears there are no recipes here. Try going back to the homepage." />
    )
  }

  return (
    <div className="recipe-list">
      <div className="recipe-list__items">
        {data.recipes.map((recipe) =>
          <div data-testid="recipe-list-item" key={recipe.id}>
            <RecipeListItem recipe={recipe} />
          </div>
        )}
      </div>

      {data.totalPages > 1 &&
        <div className="recipe-list__pagination" data-testid="recipe-list-pagination">
          <Pagination
            defaultCurrent={data.page}
            total={data.totalRecipes}
            defaultPageSize={data.pageSize}
            onChange={setPage} />
        </div>
      }
    </div>
  )
}

RecipeList.defaultProps = {
  data: null
}

RecipeList.propTypes = {
  setPage: PropTypes.func.isRequired,
  data: PropTypes.shape({
    page: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    totalRecipes: PropTypes.number.isRequired,
    recipes: PropTypes.arrayOf(PropTypes.object).isRequired
  })
}


export default withLoading(RecipeList)