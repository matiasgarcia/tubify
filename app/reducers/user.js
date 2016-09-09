import _ from 'lodash';
import { USER_PLAYLIST_CONSTANTS } from '../actions/user';

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
    default:
      return state;
  }
}
