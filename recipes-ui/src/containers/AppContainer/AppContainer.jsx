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
import RecipeDetailContainer from '../RecipeDetailContainer'

const AppContainer = () => (
  <div className="app">
    <Router>
      <Switch>
        <Route path={Routes.ROOT} exact>
          <Redirect to={Routes.RECIPE_LIST} />
        </Route>
        <Route path={Routes.RECIPE_DETAIL} component={RecipeDetailContainer} exact />
        <Route path={Routes.RECIPE_LIST} component={RecipeListContainer} exact />
      </Switch>
    </Router>
  </div>
)

export default AppContainer;
