# Recipes UI

This is a small web UI application written using [React](https://reactjs.org/).

As the project was simple enough, I've decided not to introduce a state management library (such as [Redux](https://redux.js.org/) or [Mobx](https://mobx.js.org/README.html)).

The project was bootstraped using [Facebook's create-react-app](https://github.com/facebook/create-react-app) cli, so it has pretty much what you'd expect from an app created with that tool.


## Running the project

To run the project, simply:

```sh
yarn
yarn start
```

To run the tests:

```sh
yarn lint # run eslint
yarn test # run the actual tests
```


## Environment variables

The following parameters can be configured on-build time dynamically through environment variables:

| Environment Variable        | Description                       | Default Value                |
| --------------------------- | --------------------------------- | ---------------------------- |
| REACT_APP_API_BASE_URL      | The API base URL                  | http://localhost:8000/api/v1 |
| REACT_APP_API_TIMEOUT       | Request timeout value for the API | 4000                         |
| REACT_APP_DEFAULT_PAGE_SIZE | The recipe list page size         | 4                            |