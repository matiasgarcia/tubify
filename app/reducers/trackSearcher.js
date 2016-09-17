import _ from 'lodash';
import { TRACK_SEARCH, TRACK_FOUND, TRACK_NOT_FOUND } from '../actions/tracks';

function updateTrackInfo(newState, track, updatedTrackState){
  newState[track.id] = Object.assign({}, newState[track.id], updatedTrackState);
  return newState;
}

function trackFound(newState, track, exportData){
  updateTrackInfo(newState, track, {
    results: exportData,
    isFetching: false,
    error: null
  });
  return newState;
}

function trackNotFound(newState, track, error){
  updateTrackInfo(newState, track, {
    isFetching: false,
    error: error
  });
  return newState;
}

function trackSearching(newState, track){
  updateTrackInfo(newState, track, {
    isFetching: true,
    error: null
  });
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
      return trackSearching(newState, track);
    case TRACK_FOUND:
      return trackFound(newState, track, exportData);
    case TRACK_NOT_FOUND:
      return trackNotFound(newState, track, error);
    default:
      return state;
  }
}
