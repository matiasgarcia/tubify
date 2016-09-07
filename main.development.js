import { app, BrowserWindow, Menu, shell } from 'electron';
import storage from 'electron-json-storage';
import { requestSpotifyToken } from './app/api/auth'

let menu;
let template;
let mainWindow = null;


if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
}


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    for (const name of extensions) {
      try {
        await installer.default(installer[name], forceDownload);
      } catch (e) {} // eslint-disable-line
    }
  }
};

app.on('ready', async () => {
  await installExtensions();

  // Your Spotify Applications Credentials
  var options = {
    client_id: 'f0ba527fc14e4f8ca26aacbdaebcb815',
    client_secret: '933176ced8484096b38fcb3d5fa1a3de',
    redirectUri: 'http://localhost:3000/callback',
    scopes: ['playlist-read-private', 'playlist-read-collaborative'] // Scopes limit access for OAuth tokens.
  };

  // Build the OAuth consent page URL
  mainWindow = new BrowserWindow({ width: 1024, height: 768, show: false, 'node-integration': false });
  var spotifyUrl = 'https://accounts.spotify.com/authorize?';
  var authUrl = spotifyUrl + 'client_id=' + options.client_id + '&scope=' + options.scopes.join(' ') + '&redirect_uri=' + options.redirectUri + '&response_type=code';
  mainWindow.loadURL(authUrl);
  mainWindow.show();

  function handleCallback (url) {
    if(!url.startsWith(options.redirectUri)){
      return;
    }

    var raw_code = /code=(.*)*#_=_/.exec(url) || null;
    var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
    var error = /\?error=(.+)$/.exec(url);

    if (code) {
      requestSpotifyToken(options, code).then((tokenInfo) => {
        let parsedTokenInfo = {
          accessToken: tokenInfo.access_token,
          refreshToken: tokenInfo.refresh_token,
          expiresIn: tokenInfo.expires_in
        };
        storage.set('auth', parsedTokenInfo, function(error){
          if (error) throw error;

          mainWindow.loadURL(`file://${__dirname}/app/app.html`);
        });
      });
    } else if (error) {
      alert('Oops! Something went wrong and we couldn\'t' +
        'log you in using Spotify. Please try again.');
      mainWindow.destroy();
    }
  }

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('will-navigate', function (event, url) {
    handleCallback(url);
  });

  mainWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
    handleCallback(newUrl);
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
    mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([{
        label: 'Inspect element',
        click() {
          mainWindow.inspectElement(x, y);
        }
      }]).popup(mainWindow);
    });
  }
});
