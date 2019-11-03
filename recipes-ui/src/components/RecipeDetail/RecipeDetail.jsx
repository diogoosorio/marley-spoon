import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Breadcrumb, Tag } from 'antd'
import Routes from '../../constants/routes'
import { NotFoundError } from '../ErrorPages'
import withLoading from '../Loading'
import './RecipeDetail.css'

const Breadcrumbs = ({ recipe }) => (
  <div className="recipe-detail__breadcrumbs" data-testid="recipe-detail-breadcrumbs">
    <Breadcrumb>
      <Breadcrumb.Item><Link to={Routes.RECIPE_LIST}>Recipes</Link></Breadcrumb.Item>
      <Breadcrumb.Item>{recipe.title}</Breadcrumb.Item>
    </Breadcrumb>
  </div>
)

const Title = ({ recipe }) => (
  <header className="recipe-detail__title" data-testid="recipe-detail-title">
    <h1>{recipe.title}</h1>

    {recipe.chef && <span>by {recipe.chef}</span>}
  </header>
)

const Photo = ({ recipe }) => (
  <div className="recipe-detail__image">
    <img src={recipe.photo} alt={recipe.title} />
  </div>
)

const Description = ({ recipe }) => {
  if (!recipe.description) {
    return <></>
  }

  return (
    <div className="recipe-detail__description">
      <ReactMarkdown source={recipe.description} skipHtml />
    </div>
  )
}

const Tags = ({ recipe }) => {
  if (!recipe.tags || recipe.tags.length === 0) {
    return <></>
  }

  return (
    <footer className="recipe-detail__tags">
      {recipe.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
    </footer>
  )
}


const RecipeDetail = ({ recipe }) => {
  if (recipe === null) {
    return <NotFoundError />
  }

  return (
    <section className="recipe-detail">
      <Breadcrumbs recipe={recipe} />
      <Photo recipe={recipe} />
      <Title recipe={recipe} />
      <Description recipe={recipe} />
      <Tags recipe={recipe} />
    </section>
  )
}

const recipePropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  photo: PropTypes.string,
  chef: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string)
})

Breadcrumbs.propTypes = { recipe: recipePropTypes.isRequired }
Photo.propTypes = { recipe: recipePropTypes.isRequired }
Title.propTypes = { recipe: recipePropTypes.isRequired }
Description.propTypes = { recipe: recipePropTypes.isRequired }
Tags.propTypes = { recipe: recipePropTypes.isRequired }


RecipeDetail.defaultProps = {
  recipe: null
}

RecipeDetail.propTypes = {
  recipe: recipePropTypes
}


export default withLoading(RecipeDetail)