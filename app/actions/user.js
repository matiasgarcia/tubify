import ActionFactory from '../utils/actionFactory';

export function fetchUserPlaylists(offset = 0, limit = 20){
  return ActionFactory.buildSpotifyAction('USER_PLAYLISTS', 'getUserPlaylists', {offset, limit})
}

export function fetchPlaylistTracks(userId, playlistId, offset = 0, limit = 50){
  return ActionFactory.buildSpotifyAction('PLAYLIST_TRACKS', 'getPlaylistTracks', userId, playlistId, {offset, limit});
}
