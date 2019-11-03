[![Build Status](https://travis-ci.org/diogoosorio/marley-spoon.svg?branch=master)](https://travis-ci.org/diogoosorio/marley-spoon)

# Marley Spoon Interview Challenge

This repository includes my submission for Marley Spoon's recruitment process. This repository has short TTL and as such I won't go too much into what the challenge entails, I'm assuming that the people looking at it know what the challenge is. :)

## About the project

I've ended up splitting the challenge into two small applications:

* [Recipes API](./recipes-api) - a [Grape](https://github.com/ruby-grape/grape) based REST API
* [Recipes UI](./recipes-ui) - a [React](https://reactjs.org/) based web UI

Do visit the README's of each one of them for more fine-grained details about each one.


## Running the project

### Using Docker Compose

If you have it installed, you can use [Docker Compose](https://docs.docker.com/compose/) in an easy (almost) one liner:

```sh
echo 'CONTENTFUL_ACCESS_TOKEN=your-access-token' > .env
docker-compose up
```

Replace `your-acess-token` with a real access Contentful access token. Open your browser on: `http://localhost:3000/`

Detailed instructions on how to run each application individually, outside a container are documented on their respective README's.