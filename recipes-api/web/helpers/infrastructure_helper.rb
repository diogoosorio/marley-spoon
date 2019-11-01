# frozen_string_literal: true

require 'logger'
require 'contentful'
require 'recipes/gateway'

module InfrastructureHelper
  CONTENTFUL = Contentful::Client.new(
    access_token: ENV.fetch('CONTENTFUL_ACCESS_TOKEN'),
    space: ENV.fetch('CONTENTFUL_SPACE', 'kk2bw5ojx476'),
    environment: ENV.fetch('CONTENTFUL_ENVIRONMENT', 'master'),
    timeout_read: Integer(ENV.fetch('CONTENTFUL_READ_TIMEOUT', 2)),
    timeout_connect: Integer(ENV.fetch('CONTENTFUL_CONNECT_TIMEOUT', 1)),
    timeout_write: Integer(ENV.fetch('CONTENFUL_WRITE_TIMEOUT', 2))
  )

  def logger
    return Logger.new(File.open(File::NULL, 'w')) if ENV['RACK_ENV'] == 'test'

    Api.logger
  end

  def recipes_gateway
    @recipes_gateway ||= Recipes::Gateway.new(
      contentful: CONTENTFUL,
      logger: logger
    )
  end
end
