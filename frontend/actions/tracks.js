import { requestSearchTrack, requestDownloadTrack } from '../api/backend'

export const TRACK_SEARCH = 'TRACK_SEARCH';
export const TRACK_FOUND = 'TRACK_FOUND';
export const TRACK_NOT_FOUND = 'TRACK_NOT_FOUND';
export const TRACK_DOWNLOAD_PENDING = 'TRACK_DOWNLOAD_PENDING';
export const TRACK_DOWNLOAD_SUCCESS = 'TRACK_DOWNLOAD_SUCCESS';
export const TRACK_DOWNLOAD_FAILURE = 'TRACK_DOWNLOAD_FAILURE';
export const TRACK_SELECT = 'TRACK_SELECT';
export const TRACKS_SELECT = 'TRACKS_SELECT';

export function selectTrack(trackId, selected){
  return {
    type: TRACK_SELECT,
    trackId,
    selected
  }
}

export function selectTracks(tracks){
  return {
    type: TRACKS_SELECT,
    tracks
  }
}

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

export function downloadTrackPending(track){
	return {
		type: TRACK_DOWNLOAD_PENDING,
		track
	}
}

export function downloadTrackSuccess(track, filePath){
	return {
		type: TRACK_DOWNLOAD_SUCCESS,
		track,
    filePath
	}
}

export function downloadTrackFailure(error, track){
	return {
		type: TRACK_DOWNLOAD_FAILURE,
		error,
		track
	}
}

export function downloadTrack(track){
	return (dispatch, getState) => {
		dispatch(downloadTrackPending(track));
		requestDownloadTrack(track)
			.then(({track, filePath}) => dispatch(downloadTrackSuccess(track, filePath)))
			.catch(({error, track}) => dispatch(downloadTrackFailure(error, track)))
	}

}
