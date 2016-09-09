import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './auth';
import playlists from './user'

const rootReducer = combineReducers({
  auth,
  playlists,
  routing,
});

export default rootReducer;
