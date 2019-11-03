FROM ruby:2.6

WORKDIR /recipes-api

COPY Gemfile* /recipes-api/
RUN gem install bundler && \
    bundle install

COPY . /recipes-api

CMD ["puma", "-C", "config/puma.rb", "-b", "tcp://0.0.0.0:3001", "config.ru"]