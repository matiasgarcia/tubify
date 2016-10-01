import { expect } from 'chai';
import trackDownloads from '../../frontend/reducers/trackDownloads';
import { downloadTrackPending, downloadTrackSuccess, downloadTrackFailure } from '../../frontend/actions/tracks';

describe('reducers', () => {
  describe('trackDownloads', () => {
    it('should handle initial state', () => {
      expect(trackDownloads(undefined, {})).to.deep.equal({});
    });

    it('should handle TRACK_DOWNLOAD_PENDING', () => {
      let action = downloadTrackPending({id: trackId});
      let expectedState = {};
      expectedState[trackId] = {
        downloaded: false,
        isFetching: true,
        error: null
      };
      expect(trackDownloads({}, action)).to.deep.equal(expectedState);
    });

    let trackId = 'TEST_TRACK';

    it('should handle TRACK_DOWNLOAD_SUCCESS', () => {
      let initialState = {};
      initialState[trackId] = {
        downloaded: false,
        isFetching: true,
        error: null
      };
      let action = downloadTrackSuccess({id: trackId}, '/fake/file/path');
      let expectedState = {};
      expectedState[trackId] = {
        downloaded: true,
        isFetching: false,
        error: null,
        filePath: '/fake/file/path'
      };
      expect(trackDownloads(initialState, action)).to.deep.equal(expectedState);
    });

    it('should handle TRACK_DOWNLOAD_FAILURE', () => {
      let initialState = {};
      initialState[trackId] = {
        downloaded: false,
        isFetching: true,
        error: null
      };
      let error = {msg: 'error'};
      let action = downloadTrackFailure(error, {id: trackId});
      let expectedState = {};
      expectedState[trackId] = {
        isFetching: false,
        downloaded: false,
        error: error
      };
      expect(trackDownloads(initialState, action)).to.deep.equal(expectedState);
    });

  });
});
