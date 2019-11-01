# frozen_string_literal: true

require 'spec_helper'
require 'api'
require 'json'

RSpec.describe Api do
  include Rack::Test::Methods

  def app
    described_class
  end

  describe 'GET /api/v1/invalid' do
    it 'returns a 404 status code' do
      get '/api/v1/invalid'

      expect(last_response.status).to eq(404)
    end

    it 'returns the expected error body' do
      get '/api/v1/invalid'

      expect(last_response_body).to eq(
        code: '10001',
        message: 'Not found'
      )
    end
  end

  describe 'GET /api/v1/recipes' do
    it 'returns a 200 status code', :vcr do
      get '/api/v1/recipes', skip: 1, limit: 2

      expect(last_response.status).to eq(200)
    end

    it 'returns the expected list of recipes', :vcr do
      get '/api/v1/recipes', skip: 1, limit: 2

      expect(last_response_body).to eq(
        skip: 1,
        limit: 2,
        total: 4,
        resources: [
          {
            id: '437eO3ORCME46i02SeCW46',
            title: "Crispy Chicken and Rice\twith Peas & Arugula Salad",
            description: 'Crispy chicken skin, tender meat, and rich, tomatoe' \
            'y sauce form a winning trifecta of delicious in this one-pot bra' \
            'ise. We spoon it over rice and peas to soak up every last drop o' \
            'f goodness, and serve a tangy arugula salad alongside for a vibr' \
            'ant boost of flavor and color. Dinner is served! Cook, relax, an' \
            'd enjoy!',
            chef_name: 'Jony Chives',
            photo_url: '//images.ctfassets.net/kk2bw5ojx476/5mFyTozvSoyE0Mqse' \
            'oos86/fb88f4302cfd184492e548cde11a2555/SKU1479_Hero_077-71d8a07f' \
            'f8e79abcb0e6c0ebf0f3b69c.jpg',
            tag_names: ['gluten free', 'healthy']
          },
          {
            id: '4dT8tcb6ukGSIg2YyuGEOm',
            title: 'White Cheddar Grilled Cheese with Cherry Preserves & Basil',
            description: '*Grilled Cheese 101*: Use delicious cheese and good' \
            ' quality bread; make crunchy on the outside and ooey gooey on th' \
            'e inside; add one or two ingredients for a flavor punch! In this' \
            ' case, cherry preserves serve as a sweet contrast to cheddar che' \
            'ese, and basil adds a light, refreshing note. Use __mayonnaise__' \
            ' on the outside of the bread to achieve the ultimate, crispy, go' \
            'lden-brown __grilled cheese__. Cook, relax, and enjoy!',
            chef_name: nil,
            photo_url: '//images.ctfassets.net/kk2bw5ojx476/61XHcqOBFYAYCGsKu' \
            'goMYK/0009ec560684b37f7f7abadd66680179/SKU1240_hero-374f8cece3c7' \
            '1f5fcdc939039e00fb96.jpg',
            tag_names: ['vegan']
          }
        ]
      )
    end

    context 'when the skip parameter is not an integer' do
      it 'returns a 400 status code' do
        get '/api/v1/recipes', skip: 'undefined'

        expect(last_response.status).to eq(400)
      end

      it 'returns an error response' do
        get '/api/v1/recipes', skip: 'undefined'

        expect(last_response_body).to eq(
          code: '10003',
          message: 'Invalid request parameters',
          errors: [
            'skip is invalid',
            'skip must be >= 0'
          ]
        )
      end
    end

    context 'when the skip parameter is negative' do
      it 'returns a 400 status code' do
        get '/api/v1/recipes', skip: '-1'

        expect(last_response.status).to eq(400)
      end

      it 'returns an error response' do
        get '/api/v1/recipes', skip: '-1'

        expect(last_response_body).to eq(
          code: '10003',
          message: 'Invalid request parameters',
          errors: ['skip must be >= 0']
        )
      end
    end

    context 'when the limit parameter is not an integer' do
      it 'returns a 400 status code' do
        get '/api/v1/recipes', limit: 'undefined'

        expect(last_response.status).to eq(400)
      end

      it 'returns an error response' do
        get '/api/v1/recipes', limit: 'undefined'

        expect(last_response_body).to eq(
          code: '10003',
          message: 'Invalid request parameters',
          errors: [
            'limit is invalid',
            'limit must be between 1 and 50'
          ]
        )
      end
    end

    context 'when the limit parameter smaller than 1' do
      it 'returns a 400 status code' do
        get '/api/v1/recipes', limit: '0'

        expect(last_response.status).to eq(400)
      end

      it 'returns an error response' do
        get '/api/v1/recipes', limit: '0'

        expect(last_response_body).to eq(
          code: '10003',
          message: 'Invalid request parameters',
          errors: ['limit must be between 1 and 50']
        )
      end
    end

    context 'when the limit parameter greater than 50' do
      it 'returns a 400 status code' do
        get '/api/v1/recipes', limit: '51'

        expect(last_response.status).to eq(400)
      end

      it 'returns an error response' do
        get '/api/v1/recipes', limit: '51'

        expect(last_response_body).to eq(
          code: '10003',
          message: 'Invalid request parameters',
          errors: ['limit must be between 1 and 50']
        )
      end
    end

    context 'when the Contentful API request fails' do
      before(:each) do
        stub_request(:get, /contentful/)
          .to_return(status: [500, 'Internal Server Error'])
      end

      it 'returns a 503 status code' do
        get '/api/v1/recipes'

        expect(last_response.status).to eq(503)
      end

      it 'returns an error response' do
        get '/api/v1/recipes'

        expect(last_response_body).to eq(
          code: '10004',
          message: 'Service unavailable'
        )
      end
    end
  end

  def last_response_body
    JSON.parse(last_response.body, symbolize_names: true)
  end
end
