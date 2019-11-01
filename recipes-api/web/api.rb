# frozen_string_literal: true

require 'grape'
require 'errors'
require 'helpers/infrastructure_helper'
require 'recipes/gateway'

class Api < Grape::API
  prefix :api
  version 'v1', using: :path

  helpers InfrastructureHelper

  content_type :json, 'application/json'
  default_format :json

  rescue_from Grape::Exceptions::ValidationErrors do |e|
    error!(Errors.invalid_request(e), 400)
  end

  rescue_from Recipes::Gateway::Error do
    error!(Errors.service_unavailable, 503)
  end

  rescue_from :all do
    error!(Errors.internal_error, 500)
  end

  resource :recipes do
    params do
      optional :limit,
               type: Integer,
               default: 10,
               values: { value: 1..50, message: 'must be between 1 and 50' }

      optional :skip,
               type: Integer,
               default: 0,
               values: {
                 value: ->(v) { v.is_a?(Numeric) && v >= 0 },
                 message: 'must be >= 0'
               }
    end
    get do
      recipes_gateway
        .list_recipes(skip: params[:skip], limit: params[:limit])
        .to_h
    end

    params do
      requires :id, type: String
    end
    route_param :id do
      get do
        recipe = recipes_gateway.get_recipe(id: params[:id])&.to_h

        return error!(Errors.not_found, 404) if recipe.nil?

        recipe
      end
    end
  end

  route :any, '*path' do
    error!(Errors.not_found, 404)
  end
end
