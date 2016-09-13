import { USER_PLAYLIST_CONSTANTS } from '../actions/user';

const initialState = {
	playlists: {
		totalCount: 0,
		nextOffset: 0
	}
};

export default function apiMeta(state = initialState, action){
	switch(action.type){
		case USER_PLAYLIST_CONSTANTS.SUCCESS:
			let data = action.data;
  			let offsetMatch = /offset=(\d+)/.exec(data.next);
  			let nextRequestOffset = offsetMatch ? offsetMatch[1] : 0;
			return Object.assign({}, state, {
				playlists: {
					totalCount: data.total,
					nextOffset: nextRequestOffset
				}
			});
		default:
			return state;
	}
}