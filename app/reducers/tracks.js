import _ from 'lodash';
import { PLAYLIST_TRACKS_CONSTANTS } from '../actions/playlists';

const initialState = {};

export default function tracks(state = initialState, action) {
  switch (action.type) {
    case PLAYLIST_TRACKS_CONSTANTS.SUCCESS:
      let newTracks = {};
      _.each(action.data.items, (item) => {
        let track = item.track;
        newTracks[track.id] = {
          id: track.id,
          name: track.name,
          album: track.album.name,
          artists: _.map(track.artists, (artist) => artist.name),
          isSelected: false
        }
      });
      return Object.assign({}, state, newTracks);
    default:
      return state;
  }
}
