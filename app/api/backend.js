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

export function requestDownloadTrack(trackToDownload){
  return new Promise((resolve, reject) => {
    ipcRenderer.send('download-track', trackToDownload);
    ipcRenderer.on('download-track-done', (event, track, filePath) => {
      if(trackToDownload.id == track.id){
        resolve({track, filePath})
      }
    });
    ipcRenderer.on('download-track-failed', (event, error, track) => {
      if(trackToDownload.id == track.id) {
        reject({error, track})
      }
    })
  })
}
