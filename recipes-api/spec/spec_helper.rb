# frozen_string_literal: true

ENV['RACK_ENV'] = 'test'
ENV['CONTENTFUL_ACCESS_TOKEN'] ||= 'contentful-test-token'

require 'pry'
require 'vcr'
require 'webmock/rspec'
require 'rack/test'
require_relative '../config/boot'

VCR.configure do |config|
  config.cassette_library_dir = 'spec/fixtures/vcr_cassettes'
  config.hook_into :webmock
  config.configure_rspec_metadata!

  config.default_cassette_options = { record: :once }
  config.allow_http_connections_when_no_cassette = true

  config.filter_sensitive_data('<ACCESS_TOKEN>') do
    "Bearer #{ENV['CONTENTFUL_ACCESS_TOKEN']}"
  end
end

RSpec.configure do |config|
  config.order = :random
end
