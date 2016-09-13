import _ from 'lodash';
import { USER_PLAYLIST_CONSTANTS, PLAYLIST_TRACKS_CONSTANTS } from '../actions/user';

function calculateApiPagination(newState, action){
	let data = action.data;
  	let offsetMatch = /offset=(\d+)/.exec(data.next);
  	let nextRequestOffset = offsetMatch ? offsetMatch[1] : 0;
  	return {
  		totalCount: data.total,
  		nextOffset: nextRequestOffset
  	}
}

const initialState = {
	playlists: {
		totalCount: 0,
		nextOffset: 0
	},
	playlistTracks: {}
}

export default function apiMeta(state = initialState, action){
	let newState = Object.assign({}, state);
	let data = action.data;
	switch(action.type){
		case USER_PLAYLIST_CONSTANTS.SUCCESS:
			return _.merge(newState, {
				playlists: calculateApiPagination(newState, action)
			});
		case PLAYLIST_TRACKS_CONSTANTS.SUCCESS:
			let playlistTracks = {playlistTracks: {}};
			playlistTracks[data.playlistId] = calculateApiPagination(newState, action);
			return _.merge(newState, playlistTracks)
		default:
			return state;
	}
}