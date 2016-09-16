import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppContainer from './containers/AppContainer';
import UserPlaylistPage from './containers/UserPlaylistPage';
import TrackProcessingPage from './containers/TrackProcessingPage';

export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={UserPlaylistPage} />
    <Route path="tracks" component={TrackProcessingPage} />
  </Route>
);
