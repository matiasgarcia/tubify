import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './auth';
import playlists from './user'
import trackSearch from './trackSearcher'

const rootReducer = combineReducers({
  auth,
  playlists,
  trackSearch,
  routing
});

export default rootReducer;
