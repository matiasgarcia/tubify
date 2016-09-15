import { expect } from 'chai';
import trackSearch from '../../app/reducers/trackSearcher';
import { TRACK_SEARCH, TRACK_FOUND, TRACK_NOT_FOUND, TRACK_DOWNLOAD_PENDING, TRACK_DOWNLOAD_SUCCESS, TRACK_DOWNLOAD_FAILURE } from '../../app/actions/tracks';

describe('reducers', () => {
  describe('trackSearch', () => {
    let initialState = {};

    it('should handle initial state', () => {
      expect(trackSearch(undefined, {})).to.deep.equal(initialState);
    });

    it('should handle TRACK_SEARCH', () => {
      let trackId = 'TEST_TRACK';
      let expectedState = {};
      expectedState[trackId] = {
        isFetching: true,
        error: null
      };
      expect(trackSearch({}, {
        type: TRACK_SEARCH,
        track: {
          id: trackId
        }
      })).to.deep.equal(expectedState);
    });

    it('should handle TRACK_FOUND', () => {
      let trackId = 'TEST_TRACK';
      let exportData = ['aSource', 'anotherSource'];
      let expectedState = {};
      expectedState[trackId] = {
        results: exportData,
        isFetching: false,
        error: null
      };
      expect(trackSearch({}, {
        type: TRACK_FOUND,
        track: {
          id: trackId
        },
        exportData: exportData
      })).to.deep.equal(expectedState);
    });

    it('should handle TRACK_NOT_FOUND', () => {
      let trackId = 'TEST_TRACK';
      let expectedState = {};
      expectedState[trackId] = {
        isFetching: false,
        error: 'Error found'
      };
      expect(trackSearch({}, {
        type: TRACK_NOT_FOUND,
        track: {
          id: trackId
        },
        error: 'Error found'
      })).to.deep.equal(expectedState)
    });


  });
});
