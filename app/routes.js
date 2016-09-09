import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppContainer from './containers/AppContainer';
import UserPlaylistPage from './containers/UserPlaylistPage';

export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={UserPlaylistPage} />
  </Route>
);
