# frozen_string_literal: true

require 'spec_helper'
require 'api'

RSpec.describe Api do
  include Rack::Test::Methods

  def app
    described_class
  end

  describe 'GET /' do
    it 'returns a 200 status code' do
      get '/api/v1/'

      expect(last_response.status).to eq(200)
    end

    it 'returns an hello world payload' do
      get '/api/v1'

      expect(last_response.body).to eq({ hello: :world }.to_json)
    end
  end
end
