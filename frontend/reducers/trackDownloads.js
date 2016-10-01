import { TRACK_DOWNLOAD_PENDING, TRACK_DOWNLOAD_SUCCESS, TRACK_DOWNLOAD_FAILURE } from '../actions/tracks';

function trackDownloadPending(state, action){
  let trackId = action.track.id;
  let updatedState = {};
  updatedState[trackId] = Object.assign({}, state[trackId], {
    downloaded: false,
    isFetching: true,
    error: null
  });
  return Object.assign({}, state, updatedState);
}

function trackDownloadSuccess(state, action){
  let trackId = action.track.id;
  let updatedState = {};
  updatedState[trackId] = Object.assign({}, state[trackId], {
    downloaded: true,
    isFetching: false,
    error: null,
    filePath: action.filePath
  });
  return Object.assign({}, state, updatedState);
}

function trackDownloadFailure(state, action){
  let trackId = action.track.id;
  let updatedState = {};
  updatedState[trackId] = Object.assign({}, state[trackId], {
    isFetching: false,
    error: action.error
  });
  return Object.assign({}, state, updatedState);
}

const initialState = {};

export default function tracksDownloads(state = initialState, action) {
  switch (action.type) {
    case TRACK_DOWNLOAD_PENDING:
      return trackDownloadPending(state, action);
    case TRACK_DOWNLOAD_SUCCESS:
      return trackDownloadSuccess(state, action);
    case TRACK_DOWNLOAD_FAILURE:
      return trackDownloadFailure(state, action);
    default:
      return state;
  }
}
