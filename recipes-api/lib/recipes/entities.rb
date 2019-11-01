# frozen_string_literal: true

module Recipes
  module Entities
    Page = Struct.new(
      :skip,
      :limit,
      :total,
      :resources,
      keyword_init: true
    ) do
      def to_h
        super.merge(resources: (resources || [])&.map(&:to_h))
      end
    end

    Recipe = Struct.new(
      :id,
      :title,
      :description,
      :chef_name,
      :photo_url,
      :tag_names,
      keyword_init: true
    )
  end
end
