import request from 'superagent';
import resolveRequest from './requestUtils'

export function requestSpotifyToken(options, code) {
  let apiRequest = request
    .post('https://accounts.spotify.com/api/token')
    .send(`client_id=${options.CLIENT_ID}`)
    .send(`client_secret=${options.CLIENT_SECRET}`)
    .send(`code=${code}`)
    .send(`grant_type=authorization_code`)
    .send(`redirect_uri=${options.REDIRECT_URI}`);
  return resolveRequest(apiRequest);
}

export function refreshAccessToken(options, refreshToken){
  let apiRequest = request
    .post('https://accounts.spotify.com/api/token')
    .send(`client_id=${options.CLIENT_ID}`)
    .send(`client_secret=${options.CLIENT_SECRET}`)
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
