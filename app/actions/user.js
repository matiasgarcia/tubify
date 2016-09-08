import Spotify from 'spotify-web-api-js';

const spotifyApi = new Spotify();

export const FETCH_PENDING_USER_PLAYLISTS = 'FETCH_PENDING_USER_PLAYLISTS';
export const FETCH_SUCCESS_USER_PLAYLISTS = 'FETCH_SUCCESS_USER_PLAYLISTS';
export const FETCH_FAILURE_USER_PLAYLISTS = 'FETCH_FAILURE_USER_PLAYLISTS';

export function fetchPendingUserPlaylists(){
  return {
    type: FETCH_PENDING_USER_PLAYLISTS
  }
}

export function fetchSuccessUserPlaylists(data){
  return {
    type: FETCH_SUCCESS_USER_PLAYLISTS,
    data: data
  }
}

export function fetchFailureUserPlaylists(error){
  return {
    type: FETCH_FAILURE_USER_PLAYLISTS,
    error: error
  }
}

export function fetchUserPlaylists(offset = 0, limit = 20){
  return (dispatch, getState) => {
    let { accessToken } = getState().auth.tokenData;
    spotifyApi.setAccessToken(accessToken);

    dispatch(fetchPendingUserPlaylists());
    spotifyApi.getUserPlaylists({offset, limit})
      .then((data) => dispatch(fetchSuccessUserPlaylists(data)))
      .catch((error) => dispatch(fetchFailureUserPlaylists()))
  }
}
