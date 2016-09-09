import ActionFactory from '../utils/actionFactory';
import ConstantFactory from '../utils/ConstantFactory';

export const userPlaylistConstants = ConstantFactory.buildAsyncFor('USER_PLAYLISTS');
export const playlistTracksConstants = ConstantFactory.buildAsyncFor('PLAYLIST_TRACKS');

export function fetchUserPlaylists(offset = 0, limit = 20){
  return ActionFactory.buildSpotifyAction(userPlaylistConstants, 'getUserPlaylists', {offset, limit})
}

export function fetchPlaylistTracks(userId, playlistId, offset = 0, limit = 50){
  return ActionFactory.buildSpotifyAction(playlistTracksConstants, 'getPlaylistTracks', userId, playlistId, {offset, limit});
}
