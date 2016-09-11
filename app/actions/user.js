import ActionFactory from '../utils/actionFactory';
import ConstantFactory from '../utils/constantFactory';

export const USER_PLAYLIST_CONSTANTS = ConstantFactory.buildAsyncFor('USER_PLAYLISTS');
export const PLAYLIST_TRACKS_CONSTANTS = ConstantFactory.buildAsyncFor('PLAYLIST_TRACKS');
export const TOGGLE_TRACK_SELECTION = 'TOGGLE_TRACK_SELECTION';
export const TOGGLE_PLAYLIST_SELECTION = 'TOGGLE_PLAYLIST_SELECTION';

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

export function selectTrack(playlistId, trackId, selected){
  return {
    type: 'TOGGLE_TRACK_SELECTION',
    playlistId,
    trackId,
    selected
  }
}

export function selectPlaylist(playlistId, selected){
  return {
    type: 'TOGGLE_PLAYLIST_SELECTION',
    playlistId,
    selected
  }
}