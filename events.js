import { YoutubeSearcher } from './searchers';
import { YoutubeDownloader } from './downloaders';

export default function loadEvents(config, ipcMain){
  const youtubeSearcher = new YoutubeSearcher({apiKey: 'AIzaSyBaoeeDj56V4Y6s43qW3mEf8XzHKJ-bIjs'});
  const youtubeDownloader = new YoutubeDownloader({downloadPath: config.downloadPath});

	ipcMain.on('search-track', (event, track) => {
	  let query = `${track.artists.join(', ')} - ${track.name} `;
	  youtubeSearcher.search(query)
	    .then((sources) => event.sender.send('search-track-done', null, track, sources))
	    .catch((error) => event.sender.send('search-track-done', error, track))
	});

	ipcMain.on('download-track', (event, track) => {
		youtubeDownloader.download(track.url)
			.then((stdout) => event.sender.send('download-track-done', null, track))
			.catch(({error, stderr}) => event.sender.send('download-track-done', error, track))
	})
}
