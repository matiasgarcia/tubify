import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './auth';
import playlists from './user'
import trackSearch from './trackSearcher'
import apiMeta from './apiMeta'

const rootReducer = combineReducers({
  auth,
  playlists,
  trackSearch,
  apiMeta,
  routing
});

export default rootReducer;
