import _ from 'lodash';
import { PLAYLIST_TRACKS_CONSTANTS, TOGGLE_TRACK_SELECTION } from '../actions/playlists';

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
    case TOGGLE_TRACK_SELECTION:
      let updatedTrack = Object.assign({}, state[action.trackId], {isSelected: action.selected});
      let updatedState = {};
      updatedState[action.trackId] = updatedTrack;
      return Object.assign({}, state, updatedState);
    default:
      return state;
  }
}
