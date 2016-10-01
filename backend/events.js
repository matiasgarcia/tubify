import { YoutubeSearcher } from './searchers';
import { YoutubeDownloader } from './downloaders';
import { YOUTUBE } from './constants';
import * as eventNames from './eventNames';

export default function loadEvents(config, ipcMain){
  const youtubeSearcher = new YoutubeSearcher({apiKey: YOUTUBE.API_KEY});
  const youtubeDownloader = new YoutubeDownloader({downloadPath: config.downloadPath});

	ipcMain.on(eventNames.SEARCH_TRACK, (event, track) => {
	  let query = `${track.artists.join(', ')} - ${track.name} `;
	  youtubeSearcher.search(query)
	    .then((sources) => event.sender.send(eventNames.SEARCH_TRACK_DONE, track, sources))
	    .catch((error) => event.sender.send(eventNames.SEARCH_TRACK_FAILED, error, track))
	});

	ipcMain.on(eventNames.DOWNLOAD_TRACK, (event, track) => {
		youtubeDownloader.download(track.url)
			.then(({filePath}) => event.sender.send(eventNames.DOWNLOAD_TRACK_DONE, track, filePath))
			.catch(({error, stderr}) => event.sender.send(eventNames.DOWNLOAD_TRACK_FAILED, error, track))
	})
}
