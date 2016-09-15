import _ from 'lodash';
import { TRACK_SEARCH, TRACK_FOUND, TRACK_NOT_FOUND, TRACK_DOWNLOAD_PENDING, TRACK_DOWNLOAD_SUCCESS, TRACK_DOWNLOAD_FAILURE } from '../actions/tracks';

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

function trackDownloadPending(newState, track){
  updateTrackInfo(newState, track, {
    isDownloading: true,
    downloaded: false,
    errorDownload: false
  });
  return newState;
}

function trackDownloadSuccess(newState, track){
  updateTrackInfo(newState, track, {
    isDownloading: false,
    downloaded: true,
    errorDownload: false
  });
  return newState;
}

function trackDownloadFailure(newState, track, error){
  updateTrackInfo(newState, track, {
    isDownloading: false,
    downloaded: false,
    errorDownload: error
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
    case TRACK_DOWNLOAD_PENDING:
      return trackDownloadPending(newState, track);
    case TRACK_DOWNLOAD_SUCCESS:
      return trackDownloadSuccess(newState, track);
    case TRACK_DOWNLOAD_FAILURE:
      return trackDownloadFailure(newState, track, action.error);
    default:
      return state;
  }
}
