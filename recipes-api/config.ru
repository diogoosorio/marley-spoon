# frozen_string_literal: true

require 'rack/cors'
require_relative 'config/boot'
require 'api'

use Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: :get
  end
end

run Api
