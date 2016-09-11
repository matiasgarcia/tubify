import { requestSearchTrack } from '../api/backend'

export const TRACK_SEARCH = 'TRACK_SEARCH';
export const TRACK_FOUND = 'TRACK_FOUND';
export const TRACK_NOT_FOUND = 'TRACK_NOT_FOUND';

export function trackSearch(track){
	return {
		type: TRACK_SEARCH,
		track
	}
}

export function trackFound(track, exportData){
	return {
		type: TRACK_FOUND,
		track,
		exportData
	}
}

export function trackNotFound(track){
	return {
		type: TRACK_NOT_FOUND,
		track
	}
}

export function searchTrack(trackToSearch){
	return (dispatch, getState) => {
		dispatch(trackSearch(trackToSearch));
		requestSearchTrack(trackToSearch)
			.then((data) => {
				dispatch(trackFound(data.track, data.exportData))
			})
			.catch((data) => {
				dispatch(trackNotFound(data.error, data.track))
			});
	}
}