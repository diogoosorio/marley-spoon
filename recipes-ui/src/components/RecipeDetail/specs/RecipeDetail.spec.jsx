import React from 'react'
import { render, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import RecipeDetail from '../RecipeDetail'

describe('<RecipeList />', () => {
  const recipe = {
    id: 'recipe-1',
    title: 'Recipe 1 title',
    description: 'Recipe 1 description',
    photo: '//demo.com/recipe-1.jpg',
    chef: 'Recipe 1 chef',
    tags: ['tag-1', 'tag-2']
  }

  it('renders the breadcrumbs', () => {
    const { container } = render(
      <RecipeDetail loading={false} error={false} recipe={recipe} />,
      { wrapper: MemoryRouter }
    )

    const { getByText } = within(container.querySelector('[data-testid="recipe-detail-breadcrumbs"]'))

    expect(getByText('Recipes')).toBeTruthy()
    expect(getByText('Recipe 1 title')).toBeTruthy()
  })

  it('renders the title', () => {
    const { container } = render(
      <RecipeDetail loading={false} error={false} recipe={recipe} />,
      { wrapper: MemoryRouter }
    )

    const { getByText } = within(container.querySelector('[data-testid="recipe-detail-title"]'))

    expect(getByText('Recipe 1 title')).toBeTruthy()
  })

  it('renders the description', () => {
    const { getByText } = render(
      <RecipeDetail loading={false} error={false} recipe={recipe} />,
      { wrapper: MemoryRouter }
    )

    expect(getByText('Recipe 1 description')).toBeTruthy()
  })

  it('renders the image', () => {
    const { getByAltText } = render(
      <RecipeDetail loading={false} error={false} recipe={recipe} />,
      { wrapper: MemoryRouter }
    )

    expect(getByAltText('Recipe 1 title')).toBeTruthy()
  })

  it('renders the tags', () => {
    const { getByText } = render(
      <RecipeDetail loading={false} error={false} recipe={recipe} />,
      { wrapper: MemoryRouter }
    )

    expect(getByText('tag-1')).toBeTruthy()
    expect(getByText('tag-2')).toBeTruthy()
  })

  describe('when the recipe is loading', () => {
    it('renders the loading screen', () => {
      const { getByText } = render(<RecipeDetail loading={true} error={false} />)

      expect(getByText('Loading...')).toBeTruthy()
    })
  })

  describe('when the list retrieval fails', () => {
    it('renders the error screen', () => {
      const { getByText } = render(<RecipeDetail loading={false} error={true} />)

      expect(getByText(/Error/)).toBeTruthy()
    })
  })
})