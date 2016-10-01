import google from 'googleapis'
import _ from 'lodash'

const youtube = google.youtube('v3');

class Source {
  constructor(id, title, url){
    this.id = id;
    this.title = title;
    this.url = url;
  }
}

export class YoutubeSearcher {
  constructor({apiKey}){
    this.apiKey = apiKey;
    this.baseUrl = 'https://youtube.com/watch?v=';
  }

  search(query){
    let baseUrl = this.baseUrl;
    let defaultParams = {part: 'snippet', fields: 'items(id,snippet(title))', type: 'video', key: this.apiKey};
    return new Promise((resolve, reject) => {
      let params = Object.assign({}, {q: query}, defaultParams);
      youtube.search.list(params, {}, (error, response) => {
        if(error){
          reject(error);
        } else {
          var sources = _.map(response.items, (item) => new Source(item.id.videoId, item.snippet.title, `${baseUrl}${item.id.videoId}`));
          resolve(sources);
        }
      });
    })

  }
}
