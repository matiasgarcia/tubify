import request from 'superagent';

const resolveRequest = function(request){
  return new Promise((resolve, reject) => {
    request.end((error, res) => {
      error ? reject(error) : resolve(res.body)
    })
  })
};

const requestSpotifyToken = function (options, code) {
  let apiRequest = request
    .post('https://accounts.spotify.com/api/token')
    .send(`client_id=${options.client_id}`)
    .send(`client_secret=${options.client_secret}`)
    .send(`code=${code}`)
    .send(`grant_type=authorization_code`)
    .send(`redirect_uri=${options.redirectUri}`);
  return resolveRequest(apiRequest);
};

const requestUserInfo = function (apiToken){
  let apiRequest = request
    .get('https://api.spotify.com/v1/me')
    .set('Authorization', `Bearer ${apiToken}`);
  return resolveRequest(apiRequest);
};

export { requestSpotifyToken, requestUserInfo };
