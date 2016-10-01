import { expect } from 'chai';
import tracks from '../../frontend/reducers/tracks';
import { PLAYLIST_TRACKS_CONSTANTS } from '../../frontend/actions/playlists';
import { TRACK_SELECT } from '../../frontend/actions/tracks';
import { playlistTracks } from '../fixtures/spotifyApi'

describe('reducers', () => {
  describe('tracks', () => {
    let initialState = {};
    let stateWithATrack = {};
    let trackId = "1qpbJ8GiPc706AfGqZAIei";
    stateWithATrack[trackId] = {
      id: trackId,
      name: "El Taxi",
      album: "El Taxi (feat. Pitbull, Sensato)",
      artists: ["Osmani Garcia", "Pitbull", "Sensato"],
      isSelected: false
    };

    it('should handle initial state', () => {
      expect(tracks(undefined, {})).to.deep.equal(initialState);
    });

    it('should handle PLAYLIST_TRACK_CONSTANTS.SUCCESS', () => {
      let successAction = {
        type: PLAYLIST_TRACKS_CONSTANTS.SUCCESS,
        data: playlistTracks
      };

      expect(tracks(initialState, successAction)).to.deep.equal(stateWithATrack);
    });

    it('should handle TRACK_SELECT', () => {
      let action = {
        type: TRACK_SELECT,
        trackId: trackId,
        selected: true
      };

      let updatedState = tracks(stateWithATrack, action);
      expect(updatedState[trackId].isSelected).to.equal(true)
    })
  });
});
