import { expect } from 'chai';
import playlists from '../../app/reducers/playlists';
import { USER_PLAYLIST_CONSTANTS, PLAYLIST_TRACKS_CONSTANTS, TOGGLE_TRACK_SELECTION, TOGGLE_PLAYLIST_SELECTION } from '../../app/actions/playlists';
import { userPlaylistsSuccess, playlistTracks } from '../fixtures/spotifyApi'

describe('reducers', () => {
  describe('playlists', () => {
    let initialState = {playlists: [], isFetching: false, error: null};
    it('should handle initial state', () => {
      expect(playlists(undefined, {})).to.deep.equal(initialState);
    });

    it('should handle USER_PLAYLIST_CONSTANTS.SUCCESS', () => {
      let successAction = {
        type: USER_PLAYLIST_CONSTANTS.SUCCESS,
        data: userPlaylistsSuccess
      };
      let expectedPlaylist = userPlaylistsSuccess.items[0];
      expect(playlists(initialState, successAction)).to.deep.equal({
        playlists: [{
          id: expectedPlaylist.id,
          name: expectedPlaylist.name,
          userId: expectedPlaylist.owner.id,
          totalTracksCount: expectedPlaylist.tracks.total,
          isPublic: expectedPlaylist.public,
          tracks: [],
          isFetching: false,
          error: null
        }],
        isFetching: false,
        error: null
      });
    });

    it('should handle USER_PLAYLIST_CONSTANTS.PENDING', () => {
      let pendingAction = {
        type: USER_PLAYLIST_CONSTANTS.PENDING
      };
      expect(playlists(initialState, pendingAction)).to.deep.equal({
        playlists: [],
        isFetching: true,
        error: null
      });
    });

    it('should handle USER_PLAYLIST_CONSTANTS.FAILURE', () => {
      let failureAction = {
        type: USER_PLAYLIST_CONSTANTS.FAILURE,
        error: 'There was an error!'
      };
      expect(playlists(initialState, failureAction)).to.deep.equal({
        playlists: [],
        isFetching: false,
        error: failureAction.error
      });
    });

    it('should handle PLAYLIST_TRACK_CONSTANTS.SUCCESS', () => {
      let successAction = {
        type: USER_PLAYLIST_CONSTANTS.SUCCESS,
        data: userPlaylistsSuccess
      };
      let updatedState = playlists(initialState, successAction);

      let playlistTrackSuccessAction = {
        type: PLAYLIST_TRACKS_CONSTANTS.SUCCESS,
        data: playlistTracks
      };
      let newState = playlists(updatedState, playlistTrackSuccessAction);

      let updatedPlaylistTracks = newState.playlists[0].tracks;
      let expectedTrack = playlistTracks.items[0].track;

      expect(updatedPlaylistTracks.length).to.equal(1);
      expect(updatedPlaylistTracks[0]).to.deep.equal({
        id: expectedTrack.id,
        name: expectedTrack.name,
        album: expectedTrack.album.name,
        artists: [expectedTrack.artists[0].name, expectedTrack.artists[1].name, expectedTrack.artists[2].name],
        isSelected: false
      });
    });

    it('should handle PLAYLIST_TRACK_CONSTANTS.FAILURE', () => {
      let playlistId = 'TEST21183912';
      let error = {playlistId: playlistId};
      let failureAction = {type: PLAYLIST_TRACKS_CONSTANTS.FAILURE, error: error};
      let expectedState = playlists({
        playlists: [{
          id: playlistId,
          name: 'TEST Playlist',
          isFetching: false,
          error: null
        }],
        isFetching: false,
        error: null
      }, failureAction);
      let expectedPlaylist = expectedState.playlists[0];
      expect(expectedPlaylist).to.include({
        isFetching: false,
        error: error
      })
    });

    it('should handle PLAYLIST_TRACK_CONSTANTS.PENDING', () => {
      let playlistId = 'TEST21183912';
      let pendingAction = {type: PLAYLIST_TRACKS_CONSTANTS.PENDING, data: {playlistId: playlistId}};
      let expectedState = playlists({
        playlists: [{
          id: playlistId,
          name: 'TEST Playlist',
          isFetching: false,
          error: null
        }],
        isFetching: false,
        error: null
      }, pendingAction);
      let expectedPlaylist = expectedState.playlists[0];
      expect(expectedPlaylist).to.include({
        isFetching: true,
        error: null
      })
    });

  });
});
