import Spotify from 'spotify-web-api-js';
import ConstantFactory from './constantFactory'

export default class ActionFactory {
  static buildPendingActionCreator(pendingConstant){
    return () => {
      return {
        type: pendingConstant,
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
  static buildSpotifyAction(actionName, apiCall, ...args){
    let constants = ConstantFactory.buildAsyncFor(actionName);
    let spotify = new Spotify();
    let pending = this.buildPendingActionCreator(constants.PENDING);
    let success = this.buildSuccessActionCreator(constants.SUCCESS);
    let failure = this.buildFailureActionCreator(constants.FAILURE);
    return (dispatch, getState) => {
      let { accessToken } = getState().auth.tokenData;
      spotify.setAccessToken(accessToken);

      dispatch(pending());
      spotify[apiCall].apply(spotify, args)
        .then((data) => dispatch(success(data)))
        .catch((error) => dispatch(failure(error)))
    }

  }
}
