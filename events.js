import { YoutubeSearcher } from './searchers';
import { YoutubeDownloader } from './downloaders';

let youtubeSearcher = new YoutubeSearcher({apiKey: 'AIzaSyBaoeeDj56V4Y6s43qW3mEf8XzHKJ-bIjs'});
let youtubeDownloader = new YoutubeDownloader({downloadPath: '~'});

export default function loadEvents(ipcMain){
	ipcMain.on('search-track', (event, track) => {
	  let query = `${track.artists.join(', ')} - ${track.name} `
	  youtubeSearcher.search(query)
	    .then((sources) => event.sender.send('search-track-done', null, track, sources))
	    .catch((error) => event.sender.send('search-track-done', error, track))
	});

	ipcMain.on('download-track', (event, track) => {
		youtubeDownloader.download(track.link)
			.then((stdout) => event.sender.send('download-track-done', null, track))
			.catch(({error, stderr}) => event.sender.send('download-track-done', error, track))
	})
}