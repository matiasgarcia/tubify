import { FETCH_USER_INFO_REQUEST, FETCH_USER_INFO_SUCCESS, FETCH_USER_INFO_FAILURE } from '../actions/auth';

const initialState = {
  tokenData: null,
  userInfo: null,
  isFetching: false,
  error: null
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_INFO_REQUEST:
      return Object.assign({}, state, {
        userInfo: null,
        isFetching: true,
        error: null
      });
    case FETCH_USER_INFO_SUCCESS:
      return Object.assign({}, state, {
        userInfo: action.userInfo,
        isFetching: false,
        error: null
      });
    case FETCH_USER_INFO_FAILURE:
      return Object.assign({}, state, {
        userInfo: null,
        isFetching: false,
        error: action.error
      });
    default:
      return state;
  }
}
