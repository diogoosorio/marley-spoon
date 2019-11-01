import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import Routes from '../../constants/routes';
import './AppContainer.css';

import RecipeListContainer from '../RecipeListContainer'

const AppContainer = () => (
  <div className="app">
    <Router>
      <Switch>
        <Route path={Routes.ROOT} exact>
          <Redirect to={Routes.RECIPE_LIST} />
        </Route>

        <Route path={Routes.RECIPE_LIST} component={RecipeListContainer} exact />

        <Route path={Routes.RECIPE_DETAIL} exact>
          <h1>Recipe Detail</h1>
        </Route>
      </Switch>
    </Router>
  </div>
)

export default AppContainer;
