import { ipcRenderer } from 'electron';
import * as eventNames from '../../backend/eventNames';

ipcRenderer.setMaxListeners(Infinity);

export function requestSearchTrack(trackToSearch){
  return new Promise((resolve, reject) => {
    ipcRenderer.send(eventNames.SEARCH_TRACK, trackToSearch);
    ipcRenderer.on(eventNames.SEARCH_TRACK_DONE, (event, track, exportData) => {
      if(trackToSearch.id == track.id){
        resolve({track, exportData})
      }
    });
    ipcRenderer.on(eventNames.SEARCH_TRACK_FAILED, (event, error, track) => {
      if(trackToSearch.id == track.id){
        reject({error, track});
      }
    });
  });
}

export function requestDownloadTrack(trackToDownload){
  return new Promise((resolve, reject) => {
    ipcRenderer.send(eventNames.DOWNLOAD_TRACK, trackToDownload);
    ipcRenderer.on(eventNames.DOWNLOAD_TRACK_DONE, (event, track, filePath) => {
      if(trackToDownload.id == track.id){
        resolve({track, filePath})
      }
    });
    ipcRenderer.on(eventNames.DOWNLOAD_TRACK_FAILED, (event, error, track) => {
      if(trackToDownload.id == track.id) {
        reject({error, track})
      }
    })
  })
}
