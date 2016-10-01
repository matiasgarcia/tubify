import { requestSpotifyToken, requestUserInfo } from '../api/auth'

export const FETCH_USER_INFO_REQUEST = 'FETCH_USER_INFO_REQUEST';
export const FETCH_USER_INFO_SUCCESS = 'FETCH_USER_INFO_SUCCESS';
export const FETCH_USER_INFO_FAILURE = 'FETCH_USER_INFO_FAILURE';

export function fetchUserInfoRequest(){
  return {
    type: FETCH_USER_INFO_REQUEST
  }
}

export function fetchUserInfoSuccess(userInfo){
  return {
    type: FETCH_USER_INFO_SUCCESS,
    userInfo: userInfo
  }
}

export function fetchUserInfoFailure(error){
  return {
    type: FETCH_USER_INFO_FAILURE,
    error: error
  }
}

export function fetchUserInfo(authenticationToken){
  return (dispatch, getState) => {
    dispatch(fetchUserInfoRequest());
    requestUserInfo(authenticationToken)
      .then((userInfo) => dispatch(fetchUserInfoSuccess(userInfo)))
      .catch((error) => dispatch(fetchUserInfoFailure()))
  }
}
