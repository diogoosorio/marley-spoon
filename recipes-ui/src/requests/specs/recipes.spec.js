import httpClient from '../httpClient'
import { listRecipes, getRecipe } from '../recipes'
import Media from '../../constants/media'

jest.mock('../httpClient', () => ({
  get: jest.fn()
}))

describe('Recipes requests', () => {
  afterEach(() => httpClient.get.mockReset())

  describe('.listRecipes', () => {
    it('returns the expected pagination parameters', async () => {
      httpClient.get.mockImplementationOnce(() => Promise.resolve({
        data: {
          skip: 14,
          limit: 2,
          total: 33,
          resources: []
        }
      }))

      const response = await listRecipes({ page: 14, pageSize: 2 })

      expect(response).toMatchObject({
        pageSize: 2,
        page: 14,
        totalPages: 17,
        totalRecipes: 33
      })
    });

    it('returns the parsed list of recipes', async () => {
      httpClient.get.mockImplementationOnce(() => Promise.resolve({
        data: {
          skip: 0,
          limit: 10,
          total: 4,
          resources: [
            {
              id: 'recipe-1',
              title: 'Recipe 1 title',
              description: 'Recipe 1 description',
              photo_url: '//demo.com/recipe-1.jpg',
              chef_name: 'Recipe 1 chef',
              tag_names: ['tag-1', 'tag-2']
            },
            {
              id: 'recipe-2',
              title: 'Recipe 2 title',
              description: 'Recipe 2 description',
              photo_url: '//demo.com/recipe-2.jpg',
              chef_name: 'Recipe 2 chef',
              tag_names: ['tag-3', 'tag-4']
            }
          ]
        }
      }))

      const response = await listRecipes()

      expect(response.recipes).toEqual([
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
      ])
    })

    it('invokes the expected endpoint', async () => {
      httpClient.get.mockImplementationOnce(() => Promise.resolve({
        data: {
          skip: 0,
          limit: 10,
          total: 0,
          resources: []
        }
      }))

      await listRecipes({ page: 3, pageSize: 4 })

      expect(httpClient.get.mock.calls[0][0]).toEqual(`/recipes?skip=8&limit=4`)
    })

    describe('when a recipe has a tab character in the title', () => {
      it('replaces the tab character with a space', async () => {
        httpClient.get.mockImplementationOnce(() => Promise.resolve({
          data: {
            skip: 0,
            limit: 10,
            total: 4,
            resources: [
              {
                id: 'recipe-1',
                title: "Recipe\t1\ttitle",
                description: 'Recipe 1 description',
                photo_url: '//demo.com/recipe-1.jpg',
                chef_name: 'Recipe 1 chef',
                tag_names: ['tag-1', 'tag-2']
              },
              {
                id: 'recipe-2',
                title: 'Recipe 2 title',
                description: 'Recipe 2 description',
                photo_url: '//demo.com/recipe-2.jpg',
                chef_name: 'Recipe 2 chef',
                tag_names: ['tag-3', 'tag-4']
              }
            ]
          }
        }))

        const response = await listRecipes()

        expect(response.recipes[0].title).toEqual("Recipe 1 title")
      })
    })

    describe('when a recipe has no image', () => {
      it('adds a default image to the recipe', async () => {
        httpClient.get.mockImplementationOnce(() => Promise.resolve({
          data: {
            skip: 0,
            limit: 10,
            total: 4,
            resources: [
              {
                id: 'recipe-1',
                title: 'Recipe 1 title',
                description: 'Recipe 1 description',
                photo_url: '//demo.com/recipe-1.jpg',
                chef_name: 'Recipe 1 chef',
                tag_names: ['tag-1', 'tag-2']
              },
              {
                id: 'recipe-2',
                title: 'Recipe 2 title',
                description: 'Recipe 2 description',
                photo_url: null,
                chef_name: 'Recipe 2 chef',
                tag_names: ['tag-3', 'tag-4']
              }
            ]
          }
        }))

        const response = await listRecipes()

        expect(response.recipes[1].photo).toEqual(Media.DEFAULT_IMAGE)
      })
    })

    describe('when the request fails', () => {
      it('raises an error', async () => {
        httpClient.get.mockImplementationOnce(() => Promise.reject())

        await expect(listRecipes()).rejects.toThrowError
      });
    })
  });

  describe('.getRecipe', () => {
    it('returns the parsed recipe', async () => {
      httpClient.get.mockImplementationOnce(() => Promise.resolve({
        data: {
          id: 'recipe-1',
          title: 'Recipe 1 title',
          description: 'Recipe 1 description',
          photo_url: '//demo.com/recipe-1.jpg',
          chef_name: 'Recipe 1 chef',
          tag_names: ['tag-1', 'tag-2']
        }
      }))

      const recipe = await getRecipe('recipe-1')

      expect(recipe).toEqual({
        id: 'recipe-1',
        title: 'Recipe 1 title',
        description: 'Recipe 1 description',
        photo: '//demo.com/recipe-1.jpg',
        chef: 'Recipe 1 chef',
        tags: ['tag-1', 'tag-2']
      })
    });

    it('invokes the expected endpoint', async () => {
      httpClient.get.mockImplementationOnce(() => Promise.resolve({ data: {} }))

      await getRecipe('recipe-1')

      expect(httpClient.get.mock.calls[0][0]).toEqual('/recipes/recipe-1')
    })

    describe('when the recipe has a tab character in the title', () => {
      it('strips the tab character', async () => {
        httpClient.get.mockImplementationOnce(() => Promise.resolve({
          data: {
            id: 'recipe-1',
            title: "Recipe\t1\ttitle",
            description: 'Recipe 1 description',
            photo_url: '//demo.com/recipe-1.jpg',
            chef_name: 'Recipe 1 chef',
            tag_names: ['tag-1', 'tag-2']
          }
        }))

        const recipe = await getRecipe('recipe-1')

        expect(recipe.title).toEqual('Recipe 1 title')
      })
    })

    describe('when the recipe has no image', () => {
      it('adds a default image to the recipe', async () => {
        httpClient.get.mockImplementationOnce(() => Promise.resolve({
          data: {
            id: 'recipe-1',
            title: "Recipe \t1 \ttitle",
            description: 'Recipe 1 description',
            photo_url: null,
            chef_name: 'Recipe 1 chef',
            tag_names: ['tag-1', 'tag-2']
          }
        }))

        const recipe = await getRecipe('recipe-1')

        expect(recipe.photo).toEqual(Media.DEFAULT_IMAGE)
      })
    })

    describe('when the request fails', () => {
      describe('when the error is a 404 error', () => {
        it('returns null', async () => {
          httpClient.get.mockImplementationOnce(() => Promise.reject({
            response: { status: 404 }
          }))

          const response = await getRecipe('recipe-1')

          expect(response).toEqual(null)
        })
      })

      it('raises an error', async () => {
        httpClient.get.mockImplementationOnce(() => Promise.reject({
          response: { status: 500 }
        }))

        await expect(getRecipe('recipe-1')).rejects.toThrowError
      });
    })
  });
});