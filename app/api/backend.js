import { ipcRenderer } from 'electron';

export function requestSearchTrack(trackToSearch){
	return new Promise((resolve, reject) => {
		ipcRenderer.send('search-track', trackToSearch);
		ipcRenderer.on('search-track-done', (event, error, track, exportData) => {
			if(trackToSearch.id == track.id){
				if(error){
					reject({error, track});
				} else {
					resolve({track, exportData})
				}
			}
		})
	})
}