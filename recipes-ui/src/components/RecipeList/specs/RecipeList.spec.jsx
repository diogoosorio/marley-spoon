import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import RecipeList from '../RecipeList'

describe('<RecipeList />', () => {
  it('renders the recipe list', () => {
    const data = {
      page: 1,
      pageSize: 2,
      totalPages: 2,
      totalRecipes: 4,
      recipes: [
        {
          id: 'recipe-1',
          title: 'Recipe 1 title',
          description: 'Recipe 1 description',
          photo: '//demo.com/recipe-1.jpg',
          chef: 'Recipe 1 chef',
          tags: ['tag-1', 'tag-2']
        },
        {
          id: 'recipe-2',
          title: 'Recipe 2 title',
          description: 'Recipe 2 description',
          photo: '//demo.com/recipe-2.jpg',
          chef: 'Recipe 2 chef',
          tags: ['tag-3', 'tag-4']
        },
      ]
    }

    const { getAllByTestId } = render(
      <RecipeList loading={false} error={false} data={data} setPage={() => null} />,
      { wrapper: MemoryRouter }
    )

    expect(getAllByTestId("recipe-list-item").length).toEqual(2)
  })

  describe("when there's more than one page of recipes", () => {
    it('renders the pagination component', () => {
      const data = {
        page: 1,
        pageSize: 2,
        totalPages: 3,
        totalRecipes: 6,
        recipes: []
      }

      const { getByTestId } = render(
        <RecipeList loading={false} error={false} data={data} setPage={() => null} />,
        { wrapper: MemoryRouter }
      )

      expect(getByTestId('recipe-list-pagination')).toBeTruthy()
    })

    it('renders the correct number of pages', () => {
      const data = {
        page: 1,
        pageSize: 2,
        totalPages: 3,
        totalRecipes: 6,
        recipes: []
      }

      const { getAllByText } = render(
        <RecipeList loading={false} error={false} data={data} setPage={() => null} />,
        { wrapper: MemoryRouter }
      )

      expect(getAllByText(/1|2|3/).length).toEqual(3)
    })

    describe('when a page is clicked', () => {
      it('invokes the setPage prop with the expected value', () => {
        const data = {
          page: 1,
          pageSize: 2,
          totalPages: 3,
          totalRecipes: 6,
          recipes: []
        }

        const setPage = jest.fn()

        const { getByText } = render(
          <RecipeList loading={false} error={false} data={data} setPage={setPage} />,
          { wrapper: MemoryRouter }
        )

        const pageElement = getByText('2')
        fireEvent.click(pageElement)

        expect(setPage).toHaveBeenCalledWith(2, 2)
      })
    })
  })

  describe('when the list is loading', () => {
    it('renders the loading screen', () => {
      const { getByText } = render(<RecipeList loading={true} error={false} setPage={() => null} />)

      expect(getByText('Loading...')).toBeTruthy()
    })
  })

  describe('when the list retrieval fails', () => {
    it('renders the error screen', () => {
      const { getByText } = render(<RecipeList loading={false} error={true} setPage={() => null} />)

      expect(getByText(/Error/)).toBeTruthy()
    })
  })
})