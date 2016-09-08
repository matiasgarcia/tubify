import storage from 'electron-json-storage';
import { requestSpotifyToken, requestUserInfo, refreshAccessToken } from '../api/auth'

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

function extractTokenData(data){
  let tokenData = {};
  let currentTime = new Date();
  let expiresIn = data.expires_in;
  let expirationDate = currentTime.setSeconds(currentTime.getSeconds()+expiresIn);

  if(data.refresh_token){
    tokenData.refreshToken = data.refresh_token;
  }

  tokenData.accessToken = data.access_token;
  tokenData.expiresAt = expirationDate;

  return tokenData;
}

function getTokenInformation(options, code){
  return requestSpotifyToken(options, code).then((tokenData) => extractTokenData(tokenData));
}

function getAuthData(tokenData){
  return requestUserInfo(tokenData.accessToken)
    .then((userData) => {
      return {tokenData, userData}
    })
    .then((newAuthenticationData) => setStoredAuthData(newAuthenticationData))
}

export function getRefreshedAccessToken(options, refreshToken){
  return refreshAccessToken(options, refreshToken)
    .then((tokenData) => extractTokenData(tokenData))
    .then((newAccessTokenData) => {
      return getStoredAuthData()
        .then((oldStoredAuthData) => {
          let refreshedAuthData = Object.assign({}, oldStoredAuthData);
          refreshedAuthData.tokenData = Object.assign({}, refreshedAuthData, newAccessTokenData);
          return getAuthData(refreshedAuthData.tokenData);
        })
    })
}

export function authenticate(options, code){
  return getTokenInformation(options, code)
    .then((tokenData) => getAuthData(tokenData))
}

export function refreshAuthenticationData(options){
  return new Promise((resolve, reject) => {
    getStoredAuthData()
      .then((authenticationData) => {
        let tokenData = authenticationData.tokenData;
        let now = new Date();

        if(tokenData.expiresAt > now){
          //Didn't expire yet, get user data again in case storage data changed
          getAuthData(tokenData)
            .then((storedData) => resolve(storedData))
        } else {
          //Token expired, then refresh data
          getRefreshedAccessToken(options, tokenData.refreshToken)
            .then((storedData) => resolve(storedData))
        }
      })
      .catch((error) => {reject(error)})
  });
}
