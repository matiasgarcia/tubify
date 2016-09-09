import ActionFactory from '../utils/actionFactory';
import ConstantFactory from '../utils/constantFactory';

export const USER_PLAYLIST_CONSTANTS = ConstantFactory.buildAsyncFor('USER_PLAYLISTS');
export const PLAYLIST_TRACKS_CONSTANTS = ConstantFactory.buildAsyncFor('PLAYLIST_TRACKS');

export function fetchUserPlaylists(offset = 0, limit = 50){
  return ActionFactory.buildSpotifyAction(USER_PLAYLIST_CONSTANTS, {
    apiCall: 'getUserPlaylists',
    args: [{offset, limit}]
  })
}

export function fetchPlaylistTracks(userId, playlistId, offset = 0, limit = 100){
  return ActionFactory.buildSpotifyAction(PLAYLIST_TRACKS_CONSTANTS, {
    apiCall: 'getPlaylistTracks',
    args: [userId, playlistId, {offset, limit}]
  }, {
    success: (data) => {
      data.playlistId = playlistId;
      data.userId = userId;
      return data;
    }
  });
}
