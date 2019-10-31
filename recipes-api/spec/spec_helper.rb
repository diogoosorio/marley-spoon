# frozen_string_literal: true

ENV['RACK_ENV'] = 'test'

require 'rack/test'
require_relative '../config/boot'

RSpec.configure do |config|
  config.order = :random
end
