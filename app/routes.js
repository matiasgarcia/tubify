import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppContainer from './containers/AppContainer';
import HomePage from './containers/HomePage';

export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={HomePage} />
  </Route>
);
