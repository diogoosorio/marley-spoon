# frozen_string_literal: true

require 'logger'
require 'contentful'
require 'recipes/entities'

module Recipes
  class Gateway
    private

    attr_reader :contentful
    attr_reader :logger

    public

    def initialize(logger:, contentful:)
      @contentful = contentful
      @logger = logger
    end

    def list_recipes(skip: 0, limit: 10)
      with_error_handling do
        response = contentful.entries(
          DEFAULT_ARGUMENTS.merge(
            skip: skip,
            limit: limit
          )
        )

        map_page(response)
      end
    end

    def get_recipe(id:)
      with_error_handling do
        entry = contentful.entry(id, DEFAULT_ARGUMENTS.merge({}))

        map_recipe(entry) unless entry.nil?
      end
    end

    private

    def with_error_handling
      yield
    rescue Contentful::Error => e
      logger.error(e)

      raise Error, "Error retrieving data from the Contentful API: #{e.message}"
    end

    def map_page(response)
      Entities::Page.new(
        skip: response.skip,
        limit: response.limit,
        total: response.total,
        resources: response.entries.map(&method(:map_recipe))
      )
    end

    def map_recipe(entity)
      Entities::Recipe.new(
        id: entity.sys[:id],
        title: entity.fields[:title],
        description: entity.fields[:description],
        chef_name: entity.fields[:chef]&.name,
        photo_url: entity.fields[:photo]&.url,
        tag_names: (entity.fields[:tags] || []).map(&:name)
      )
    end

    DEFAULT_FIELDS = [
      'sys.id',
      'fields.title',
      'fields.description',
      'fields.photo',
      'fields.chef',
      'fields.tags'
    ].freeze

    DEFAULT_ARGUMENTS = {
      select: DEFAULT_FIELDS.join(','),
      content_type: 'recipe',
      include: 1
    }.freeze

    class Error < RuntimeError; end

    private_constant :DEFAULT_ARGUMENTS
    private_constant :DEFAULT_FIELDS
  end
end
