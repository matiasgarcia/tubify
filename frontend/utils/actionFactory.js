import Spotify from 'spotify-web-api-js';

export default class ActionFactory {
  static buildPendingActionCreator(pendingConstant){
    return () => {
      return {
        type: pendingConstant,
        data: {}
      }
    }
  }
  static buildSuccessActionCreator(successConstant){
    return (data) => {
      return {
        type: successConstant,
        data: data
      }
    }
  }
  static buildFailureActionCreator(failureConstant){
    return (error) => {
      return {
        type: failureConstant,
        error: error
      }
    }
  }
  static buildSpotifyAction(constants, apiOptions, callbackOptions = {}){
    let spotify = new Spotify();
    let pending = this.buildPendingActionCreator(constants.PENDING);
    let success = this.buildSuccessActionCreator(constants.SUCCESS);
    let failure = this.buildFailureActionCreator(constants.FAILURE);
    return (dispatch, getState) => {
      let { accessToken } = getState().auth.tokenData;
      spotify.setAccessToken(accessToken);
      let processedPending = pending();
      callbackOptions.pending && callbackOptions.pending(processedPending.data);
      dispatch(processedPending);
      spotify[apiOptions.apiCall].apply(spotify, apiOptions.args)
        .then((data) => {
          let processedData = callbackOptions.success ? callbackOptions.success(data) : data;
          return dispatch(success(processedData))
        })
        .catch((error) => {
          let processedError = callbackOptions.failure ? callbackOptions.failure(error) : error;
          return dispatch(failure(processedError))
        })
    }

  }
}
