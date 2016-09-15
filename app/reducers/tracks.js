import _ from 'lodash';
import { PLAYLIST_TRACKS_CONSTANTS } from '../actions/playlists';
import { TRACK_SELECT } from '../actions/tracks';

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
    case TRACK_SELECT:
      let updatedTrack = Object.assign({}, state[action.trackId], {isSelected: action.selected});
      let updatedState = {};
      updatedState[action.trackId] = updatedTrack;
      return Object.assign({}, state, updatedState);
    default:
      return state;
  }
}
