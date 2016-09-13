import { YoutubeSearcher } from './searchers'

let youtube = new YoutubeSearcher({apiKey: 'AIzaSyBaoeeDj56V4Y6s43qW3mEf8XzHKJ-bIjs'});

export default function loadEvents(ipcMain){
	ipcMain.on('search-track', (event, track) => {
	  let query = `${track.artists.join(', ')} - ${track.name} `
	  youtube.search(query)
	    .then((sources) => event.sender.send('search-track-done', null, track, sources))
	    .catch((error) => event.sender.send('search-track-done', error, track))
	});
}