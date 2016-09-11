import _ from 'lodash';
import { TRACK_SEARCH, TRACK_FOUND, TRACK_NOT_FOUND } from '../actions/trackSearcher';

const initialState = {};

export default function trackSearch(state = initialState, action) {
  switch (action.type) {
    case TRACK_SEARCH.PENDING:
      return state;
    case TRACK_FOUND:
      return state;
    case TRACK_NOT_FOUND:
      return state;
    default:
      return state;
  }
}
