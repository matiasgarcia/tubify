import _ from 'lodash';
import { TRACK_SEARCH, TRACK_FOUND, TRACK_NOT_FOUND, TRACK_DOWNLOAD_PENDING, TRACK_DOWNLOAD_SUCCESS, TRACK_DOWNLOAD_FAILURE } from '../actions/trackSearcher';

function trackFound(newState, track, exportData){
  newState[track.id] = {
    results: exportData,
    isFetching: false,
    error: null
  };
  return newState;
}

function trackNotFound(newState, track, error){
  _.merge(newState[track.id], {
    isFetching: false,
    error: error
  });
  return newState;
}

function trackSearching(newState, track){
  _.merge(newState[track.id], {
    isFetching: true,
    error: null
  });
  return newState;
}

function trackDownloadPending(newState, track){
  _.merge(newState[track.id], {
    isDownloading: true,
    downloaded: false,
    errorDownload: false
  });
  return newState;
}

function trackDownloadSuccess(newState, track){
  _.merge(newState[track.id], {
    isDownloading: false,
    downloaded: true,
    errorDownload: false
  });
  return newState;
}

function trackDownloadFailure(newState, track, error){
  _.merge(newState[track.id], {
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
