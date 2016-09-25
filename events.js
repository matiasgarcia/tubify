import { YoutubeSearcher } from './searchers';
import { YoutubeDownloader } from './downloaders';
import { YOUTUBE } from './constants';

export default function loadEvents(config, ipcMain){
  const youtubeSearcher = new YoutubeSearcher({apiKey: YOUTUBE.API_KEY});
  const youtubeDownloader = new YoutubeDownloader({downloadPath: config.downloadPath});

	ipcMain.on('search-track', (event, track) => {
	  let query = `${track.artists.join(', ')} - ${track.name} `;
	  youtubeSearcher.search(query)
	    .then((sources) => event.sender.send('search-track-done', track, sources))
	    .catch((error) => event.sender.send('search-track-failed', error, track))
	});

	ipcMain.on('download-track', (event, track) => {
		youtubeDownloader.download(track.url)
			.then(({filePath}) => event.sender.send('download-track-done', track, filePath))
			.catch(({error, stderr}) => event.sender.send('download-track-failed', error, track))
	})
}
