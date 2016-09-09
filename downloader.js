import { execFile } from 'child_process'

export class Downloader {
  constructor(downloadPath){
    this.options = { cwd: downloadPath };
  }

  downloadFromYoutube(link){
    return new Promise((resolve, reject) => {
      execFile('youtube-dl', ['-f', 'bestaudio[ext=m4a]/bestaudio', link], this.options, (error, stdout, stderr) => {
        if (error || stderr) reject(error, stderr);
        resolve(stdout);
      })
    })
  }
}
