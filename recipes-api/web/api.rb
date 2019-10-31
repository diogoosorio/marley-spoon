# frozen_string_literal: true

require 'grape'

class Api < Grape::API
  prefix :api
  version 'v1', using: :path

  content_type :json, 'application/json'
  content_type :json, 'application/hal+json'
  default_format :json

  get do
    { hello: :world }
  end
end
