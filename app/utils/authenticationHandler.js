import storage from 'electron-json-storage';
import { requestSpotifyToken, requestUserInfo } from '../api/auth'

export const AUTH_STORAGE_KEY = 'auth';

export function getStoredAuthData(){
  return new Promise((resolve, reject) => {
    storage.get(AUTH_STORAGE_KEY, function(error, authenticationData){
      if (error) reject(error);
      resolve(authenticationData);
    })
  })
}

function setStoredAuthData(authenticationData){
  return new Promise((resolve, reject) => {
    storage.set(AUTH_STORAGE_KEY, authenticationData, function(error, authenticationData){
      if (error) reject(error);
      resolve(authenticationData);
    })
  })
}

function getTokenInformation(options, code){
  return requestSpotifyToken(options, code).then((tokenData) => {
    let currentTime = new Date();
    let expiresIn = tokenData.expires_in;
    let expirationDate = currentTime.setSeconds(currentTime.getSeconds()+expiresIn);

    return {
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresAt: expirationDate
    };
  });
}

function getAuthData(tokenData){
  return requestUserInfo(tokenData.accessToken)
    .then((userData) => {
      return {tokenData, userData}
    })
    .then((newAuthenticationData) => setStoredAuthData(newAuthenticationData))
}

export function authenticate(options, code){
  return getTokenInformation(options, code)
    .then((tokenData) => getAuthData(tokenData))
}

export function refreshAuthenticationData(options){
  return new Promise((resolve, reject) => {
    getStoredAuthData().then((authenticationData) => {
      let tokenData = authenticationData.tokenData;
      let now = new Date();

      if(tokenData.expiresAt > now){
        //Didn't expire yet, get user data again in case storage data changed
        getAuthData(tokenData)
          .then((storedData) => resolve(storedData))
          .catch((error) => reject(error))
      } else {
        //Token expired, then refresh data
        authenticate(options, tokenData.refreshToken)
          .then((storedData) => resolve(storedData));
      }
    })
      .catch((error) => {throw error})
  });
}
