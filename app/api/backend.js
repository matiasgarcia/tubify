import { ipcRenderer } from 'electron';

export function requestSearchTrack(trackToSearch){
  return new Promise((resolve, reject) => {
    ipcRenderer.send('search-track', trackToSearch);
    ipcRenderer.on('search-track-done', (event, track, exportData) => {
      if(trackToSearch.id == track.id){
        resolve({track, exportData})
      }
    });
    ipcRenderer.on('search-track-failed', (event, error, track) => {
      if(trackToSearch.id == track.id){
        reject({error, track});
      }
    });
  });
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
