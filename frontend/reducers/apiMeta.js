import _ from 'lodash';
import { USER_PLAYLIST_CONSTANTS, PLAYLIST_TRACKS_CONSTANTS } from '../actions/playlists';

class ApiMeta {
	constructor(totalCount, nextOffset){
		this.totalCount = totalCount;
		this.nextOffset = nextOffset;
	}
}

function calculateApiPagination(newState, action){
	let data = action.data;
  	let offsetMatch = /offset=(\d+)/.exec(data.next);
  	let nextRequestOffset = offsetMatch ? offsetMatch[1] : 0;
  	return new ApiMeta(data.total, nextRequestOffset);
}

function userPlaylistSuccess(state, action){
	let newState = Object.assign({}, state);
	let playlistTracks = {};
	_.each(action.data.items, (playlist) => {
		playlistTracks[playlist.id] = new ApiMeta(playlist.tracks.total, 0)
	})
	return _.merge(newState, {
		playlists: calculateApiPagination(newState, action),
		playlistTracks: playlistTracks
	});
}

const initialState = {
	playlists: new ApiMeta(0, 0),
	playlistTracks: {}
}

export default function apiMeta(state = initialState, action){
	let newState = Object.assign({}, state);
	let data = action.data;
	switch(action.type){
		case USER_PLAYLIST_CONSTANTS.SUCCESS:
			return userPlaylistSuccess(state, action);
		case PLAYLIST_TRACKS_CONSTANTS.SUCCESS:
			let playlistTracks = {playlistTracks: {}};
			playlistTracks.playlistTracks[data.playlistId] = calculateApiPagination(newState, action);
			return _.merge(newState, playlistTracks)
		default:
			return state;
	}
}
