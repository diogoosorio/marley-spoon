import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { generatePath, Link } from 'react-router-dom'
import Routes from '../../constants/routes'
import './RecipeListItem.css'

const { Meta } = Card

const RecipeListItem = ({ recipe }) => {
  const href = generatePath(Routes.RECIPE_DETAIL, { id: recipe.id })
  const image = <img className="recipe-list-item__image" src={recipe.photo} alt={recipe.title} />

  return (
    <div className="recipe-list-item">
      <Link to={href}>
        <Card cover={image}>
          <Meta title={recipe.title} />
        </Card>
      </Link>
    </div>
  )
}

RecipeListItem.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    photo: PropTypes.string
  }).isRequired
}

export default RecipeListItem
