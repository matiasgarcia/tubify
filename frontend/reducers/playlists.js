import _ from 'lodash';
import { USER_PLAYLIST_CONSTANTS, PLAYLIST_TRACKS_CONSTANTS } from '../actions/playlists';

const initialState = {
  playlists: [],
  isFetching: false,
  error: null,
};

function playlistTracksSuccess(state, action){
  let updatedPlaylists = _.cloneDeep(state.playlists);
  let index = _.findIndex(updatedPlaylists, (playlist) => playlist.id == action.data.playlistId);
  let playlist = updatedPlaylists[index];

  let tracks = _.map(action.data.items, (item) => item.track.id);

  playlist.tracks = _.concat(playlist.tracks, tracks);
  playlist.isFetching = false;
  playlist.error = null;
  return Object.assign({}, state, {
    playlists: updatedPlaylists,
  });
}

function playlistTracksPending(state, action){
  let updatedPlaylists = _.cloneDeep(state.playlists);
  let index = _.findIndex(updatedPlaylists, (playlist) => playlist.id == action.data.playlistId);
  let playlist = updatedPlaylists[index];

  playlist.isFetching = true;
  playlist.error = null;

  return Object.assign({}, state, {
    playlists: updatedPlaylists,
  });
}

function playlistTracksFailure(state, action){
  let updatedPlaylists = _.cloneDeep(state.playlists);
  let index = _.findIndex(updatedPlaylists, (playlist) => playlist.id == action.error.playlistId);
  let playlist = updatedPlaylists[index];

  playlist.isFetching = false;
  playlist.error = action.error;

  return Object.assign({}, state, {
    playlists: updatedPlaylists,
  });
}

function userPlaylistsSuccess(state, action){
  let data = action.data;
  let newPlaylists = _.map(data.items, (playlistData) => {
    return {
      id: playlistData.id,
      name: playlistData.name,
      userId: playlistData.owner.id,
      images: playlistData.images,
      totalTracksCount: playlistData.tracks.total,
      tracks: [],
      isFetching: false,
      error: null,
      isPublic: playlistData.public
    }
  });
  let updatedPlaylists = _.concat(state.playlists, newPlaylists);
  return Object.assign({}, state, {
    playlists: updatedPlaylists,
    isFetching: false,
    error: null,
  });
}

export default function playlists(state = initialState, action) {
  switch (action.type) {
    case USER_PLAYLIST_CONSTANTS.PENDING:
      return Object.assign({}, state, {
        isFetching: true,
        error: null
      });
    case USER_PLAYLIST_CONSTANTS.SUCCESS:
      return userPlaylistsSuccess(state, action);
    case USER_PLAYLIST_CONSTANTS.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    case PLAYLIST_TRACKS_CONSTANTS.PENDING:
      return playlistTracksPending(state, action);
    case PLAYLIST_TRACKS_CONSTANTS.SUCCESS:
      return playlistTracksSuccess(state, action);
    case PLAYLIST_TRACKS_CONSTANTS.FAILURE:
      return playlistTracksFailure(state, action);
    default:
      return state;
  }
}
