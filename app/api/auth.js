import request from 'superagent';
import resolveRequest from './requestUtils'

export function requestSpotifyToken(options, code) {
  let apiRequest = request
    .post('https://accounts.spotify.com/api/token')
    .send(`client_id=${options.client_id}`)
    .send(`client_secret=${options.client_secret}`)
    .send(`code=${code}`)
    .send(`grant_type=authorization_code`)
    .send(`redirect_uri=${options.redirectUri}`);
  return resolveRequest(apiRequest);
}

export function refreshAccessToken(options, refreshToken){
  let apiRequest = request
    .post('https://accounts.spotify.com/api/token')
    .send(`client_id=${options.client_id}`)
    .send(`client_secret=${options.client_secret}`)
    .send(`refresh_token=${refreshToken}`)
    .send(`grant_type=refresh_token`);
  return resolveRequest(apiRequest);
}

export function requestUserInfo(apiToken){
  let apiRequest = request
    .get('https://api.spotify.com/v1/me')
    .set('Authorization', `Bearer ${apiToken}`);
  return resolveRequest(apiRequest);
}
