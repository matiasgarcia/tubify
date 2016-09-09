import _ from 'lodash';
import { USER_PLAYLIST_CONSTANTS, PLAYLIST_TRACKS_CONSTANTS } from '../actions/user';

const initialState = {
  playlists: [],
  totalPlaylists: null,
  isFetching: false,
  error: null
};

export default function playlists(state = initialState, action) {
  switch (action.type) {
    case USER_PLAYLIST_CONSTANTS.PENDING:
      return Object.assign({}, state, {
        isFetching: true,
        error: null
      });
    case USER_PLAYLIST_CONSTANTS.SUCCESS:
      let data = action.data;
      let newPlaylists = _.map(data.items, (playlistData) => {
        return {
          id: playlistData.id,
          name: playlistData.name,
          userId: playlistData.owner.id,
          totalTracks: playlistData.tracks.total,
          tracks: [],
          isPublic: playlistData.public
        }
      });
      return Object.assign({}, state, {
        totalPlaylists: data.total,
        playlists: _.concat(state.playlists, newPlaylists),
        isFetching: false,
        error: null
      });
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
      let tracks = _.map(action.data.items, (item) => {
        let track = item.track;
        return {
          name: track.name,
          album: track.album.name,
          artists: _.map(track.artists, (artist) => artist.name)
        }
      });
      let updatedPlaylists = _.cloneDeep(state.playlists);
      let index = _.findIndex(updatedPlaylists, (playlist) => playlist.id == action.data.playlistId);
      console.log('Index: ' + index + 'Playlist id: ' + action.data.playlistId);
      let playlist = updatedPlaylists[index];
      playlist.tracks = _.concat(playlist.tracks, tracks);
      return Object.assign({}, state, {
        playlists: updatedPlaylists,
        isFetching: false,
        error: null
      });
    case PLAYLIST_TRACKS_CONSTANTS.FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
}
