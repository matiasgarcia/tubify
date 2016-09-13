import _ from 'lodash';
import { USER_PLAYLIST_CONSTANTS, PLAYLIST_TRACKS_CONSTANTS, TOGGLE_TRACK_SELECTION, TOGGLE_PLAYLIST_SELECTION } from '../actions/user';

const initialState = {
  playlists: [],
  isFetching: false,
  error: null,
};

function playlistTracksSuccess(state, action){
  let tracks = _.map(action.data.items, (item) => {
    let track = item.track;
    return {
      id: track.id,
      name: track.name,
      album: track.album.name,
      artists: _.map(track.artists, (artist) => artist.name),
      isSelected: false
    }
  });
  let updatedPlaylists = _.cloneDeep(state.playlists);
  let index = _.findIndex(updatedPlaylists, (playlist) => playlist.id == action.data.playlistId);
  let playlist = updatedPlaylists[index];
  playlist.tracks = _.concat(playlist.tracks, tracks);
  return Object.assign({}, state, {
    playlists: updatedPlaylists,
    isFetching: false,
    error: null
  });
}

function userPlaylistsSuccess(state, action){
  let data = action.data;
  let newPlaylists = _.map(data.items, (playlistData) => {
    return {
      id: playlistData.id,
      name: playlistData.name,
      userId: playlistData.owner.id,
      totalTracksCount: playlistData.tracks.total,
      tracks: [],
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

function switchTrackSelectedState(playlists, playlistId, trackId, selectedState){
  let foundPlaylist = _.find(playlists, (playlist) => playlist.id == playlistId);
  let foundTrack = _.find(foundPlaylist.tracks, (track) => track.id == trackId);
  foundTrack.isSelected = selectedState;
  return foundTrack;
}

function switchPlaylistTracksSelectedState(playlists, playlistId, selectedState){
  let playlist = _.find(playlists, (playlist) => playlist.id == playlistId);
  _.each(playlist.tracks, (track) => {
    track.isSelected = selectedState;
    return true;
  });
  return playlist;
}

function toggleTrackSelection(state, action){
  let newState = _.cloneDeep(state);
  switchTrackSelectedState(newState.playlists, action.playlistId, action.trackId, action.selected);
  return newState;
}

function togglePlaylistSelection(state, action){
  let newState = _.cloneDeep(state);
  let playlist = switchPlaylistTracksSelectedState(newState.playlists, action.playlistId, action.selected);
  return newState;
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
      return Object.assign({}, state, {
        isFetching: true,
        error: null
      });
    case PLAYLIST_TRACKS_CONSTANTS.SUCCESS:
      return playlistTracksSuccess(state, action);
    case PLAYLIST_TRACKS_CONSTANTS.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    case TOGGLE_TRACK_SELECTION:
      return toggleTrackSelection(state, action);
    case TOGGLE_PLAYLIST_SELECTION:
      return togglePlaylistSelection(state, action);
    default:
      return state;
  }
}
