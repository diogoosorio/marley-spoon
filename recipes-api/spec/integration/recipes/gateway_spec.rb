# frozen_string_literal: true

require 'spec_helper'
require 'recipes/gateway'
require 'recipes/entities'

RSpec.describe Recipes::Gateway, :vcr do
  subject(:gateway) do
    described_class.new(contentful: contentful_client, logger: logger)
  end

  describe '#list_recipes' do
    it 'returns the expected recipe list' do
      response = gateway.list_recipes(skip: 1, limit: 1)

      expect(response.to_h).to eq(
        skip: 1,
        limit: 1,
        total: 4,
        resources: [recorded_recipe]
      )
    end

    describe 'when the request to the Contenful API returns an error' do
      before(:each) do
        stub_request(:get, /contentful/)
          .to_return(status: [500, 'Internal Server Error'])
      end

      it 'returns a Recipes::Gateway::Error' do
        expect { gateway.list_recipes }.to raise_error(Recipes::Gateway::Error)
      end
    end
  end

  describe '#get_recipe' do
    it 'returns the recipe' do
      recipe = gateway.get_recipe(id: '437eO3ORCME46i02SeCW46')

      expect(recipe.to_h).to eq(recorded_recipe)
    end

    describe 'when the request to the Contenful API returns an error' do
      before(:each) do
        stub_request(:get, /contentful/)
          .to_return(status: [500, 'Internal Server Error'])
      end

      it 'returns a Recipes::Gateway::Error' do
        expect { gateway.get_recipe(id: 'recipe') }
          .to raise_error(Recipes::Gateway::Error)
      end
    end

    describe 'when the request to the Contenful API returns no results' do
      it 'returns nil' do
        expect(gateway.get_recipe(id: 'invalid')).to eq(nil)
      end
    end
  end

  # rubocop:disable Metrics/MethodLength
  def recorded_recipe
    {
      id: '437eO3ORCME46i02SeCW46',
      title: "Crispy Chicken and Rice\twith Peas & Arugula Salad",
      description: 'Crispy chicken skin, tender meat, and rich, tomatoey sauc' \
      'e form a winning trifecta of delicious in this one-pot braise. We spoo' \
      'n it over rice and peas to soak up every last drop of goodness, and se' \
      'rve a tangy arugula salad alongside for a vibrant boost of flavor and ' \
      'color. Dinner is served! Cook, relax, and enjoy!',
      chef_name: 'Jony Chives',
      photo_url: '//images.ctfassets.net/kk2bw5ojx476/5mFyTozvSoyE0Mqse' \
      'oos86/fb88f4302cfd184492e548cde11a2555/SKU1479_Hero_077-' \
      '71d8a07ff8e79abcb0e6c0ebf0f3b69c.jpg',
      tag_names: ['gluten free', 'healthy']
    }.freeze
  end
  # rubocop:enable Metrics/MethodLength

  def contentful_client
    Contentful::Client.new(
      access_token: ENV.fetch('CONTENTFUL_ACCESS_TOKEN'),
      space: ENV.fetch('CONTENTFUL_SPACE', 'kk2bw5ojx476'),
      environment: ENV.fetch('CONTENTFUL_ENVIRONMENT', 'master')
    )
  end

  def logger
    Logger.new(File.open(File::NULL, 'w'))
  end
end
