# Recipes API

Small REST API which serves as a proxy to the Contentful API.

Given the scope, I've decided to go with a [Ruby Grape](https://github.com/ruby-grape/grape) based application, wrapped by a [Puma](https://github.com/puma/puma) as a webserver.

Given that the application's workload is heavily IO-bound (its basically a proxy to Contentful), running Puma in clustered mode (with more than one thread web-server per-process) is heavily recommended. Although we'll be always restricted by MRI's GIL, all the IO can be heavily parallelized.


## Running the project

You'll need `ruby-2.6.5` to run the project. Hopefully you have `rbenv` or `rvm` and you just have to ask the tool to load the correct ruby version (as described on the `.ruby-version` file).

First install the project's dependencies using Bundler:

```sh
rbenv local  # using rbenv as an example
bundle install
```

After that start the webserver bound to port 8000 (replace the `CONTENTFUL_ACCESS_TOKEN` env variable with a valid token):

```
CONTENTFUL_ACCESS_TOKEN=your-access-token bundle exec puma -C config/puma.rb -b tcp://0.0.0.0:8000 config.ru
```

To run the tests:

```
bundle exec rubocop # Run the rubocop linter
bundle exec rspec   # Run the actual specs
```


## Environment variables

The following parameters can be configured dynamically through environment variables:

| Environment Variable        | Description                                          | Default Value        |
| --------------------------- | ---------------------------------------------------- | -------------------- |
| CONTENTFUL_ACCESS_TOKEN     | The Contentful API token                             | --                   |
| CONTENTFUL_SPACE            | The Contentful Space ID                              | kk2bw5ojx476         |
| CONTENTFUL_ENVIRONMENT      | The Contentful environment                           | master               |
| CONTENTFUL_CONNECT_TIMEOUT  | Connect timeout value to the Contenful API (seconds) | 1                    |
| CONTENTFUL_READ_TIMEOUT     | Read timeout value to the Contenful API (seconds)    | 4                    |
| CONTENTFUL_WRITE_TIMEOUT    | Write timeout value to the Contenful API (seconds)   | 4                    |
| PUMA_WORKERS                | Number of webserver processes                        | 1                    |
| PUMA_MIN_THREADS            | Min number of threads per webserver process          | 1                    |
| PUMA_MAX_THREADS            | Max number of threads per webserver process          | 1                    |


## Postman

If you happen to have [Postman](https://www.getpostman.com/) installed, I've included some useful collections within the [./postman](./postman) directory - it has examples both for the queries I've ended up using to Contentful's API and some sample requests to the API.

As usual, please define the `CONTENTFUL_ACCESS_TOKEN` as a Postman environment variable before triggering the requests.