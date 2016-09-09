import ActionFactory from '../utils/actionFactory';
import ConstantFactory from '../utils/ConstantFactory';

export const USER_PLAYLIST_CONSTANTS = ConstantFactory.buildAsyncFor('USER_PLAYLISTS');
export const PLAYLIST_TRACKS_CONSTANTS = ConstantFactory.buildAsyncFor('PLAYLIST_TRACKS');

export function fetchUserPlaylists(offset = 0, limit = 20){
  return ActionFactory.buildSpotifyAction(USER_PLAYLIST_CONSTANTS, 'getUserPlaylists', {offset, limit})
}

export function fetchPlaylistTracks(userId, playlistId, offset = 0, limit = 50){
  return ActionFactory.buildSpotifyAction(PLAYLIST_TRACKS_CONSTANTS, 'getPlaylistTracks', userId, playlistId, {offset, limit});
}
