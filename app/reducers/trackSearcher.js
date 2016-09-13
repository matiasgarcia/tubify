import _ from 'lodash';
import { TRACK_SEARCH, TRACK_FOUND, TRACK_NOT_FOUND } from '../actions/trackSearcher';

function trackFound(newState, track, exportData){
  newState[track.id] =   {
    results: exportData,
    isFetching: false,
    error: null
  };
  return newState;
}

function trackNotFound(newState, track, error){
  newState[track.id] = {
    isFetching: false,
    error: error
  }
  return newState;
}

function trackSearch(newState, track){
  newState[track.id] = {
    isFetching: true,
    error: null
  }
  return newState;
}

const initialState = {};

export default function trackSearch(state = initialState, action) {
  let newState = _.cloneDeep(state);
  let track = action.track;
  let exportData = action.exportData;
  let error = action.error;
  switch (action.type) {
    case TRACK_SEARCH:
      return trackSearch(newState, track);
    case TRACK_FOUND:
      return trackFound(newState, track, exportData);
    case TRACK_NOT_FOUND:
      return trackNotFound(newState, track, error);
    default:
      return state;
  }
}
