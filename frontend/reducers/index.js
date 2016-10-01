import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './auth';
import playlists from './playlists'
import trackSearch from './trackSearcher'
import apiMeta from './apiMeta'
import tracks from './tracks'
import trackDownloads from './trackDownloads'
import config from './config'

const rootReducer = combineReducers({
  auth,
  playlists,
  trackSearch,
  apiMeta,
  tracks,
  trackDownloads,
  config,
  routing
});

export default rootReducer;
