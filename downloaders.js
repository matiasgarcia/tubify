import { execFile } from 'child_process'

export class YoutubeDownloader {
  constructor({downloadPath}){
    this.options = { cwd: downloadPath };
  }

  download(link){
    let options = this.options;
    return new Promise((resolve, reject) => {
      execFile('youtube-dl', ['-f', 'bestaudio[ext=m4a]/bestaudio', link], options, (error, stdout, stderr) => {
        if (error || stderr) reject({error, stderr});
        let filePath = this.extractFileDownloadPath(stdout);
        resolve({filePath});
      })
    })
  }

  extractFileDownloadPath(stdout){
    let extractRegexp = /\[download\] Destination: (.*)/.exec(stdout);
    let fileName = (extractRegexp && extractRegexp[1]) ? extractRegexp[1] : '';
    return `${this.options.cwd}/${fileName}`;
  }
}
