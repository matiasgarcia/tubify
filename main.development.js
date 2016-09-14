import { app, BrowserWindow, Menu, shell, ipcMain } from 'electron';
import _ from 'lodash';
import * as authenticationHandler from './app/utils/authenticationHandler'
import loadEvents from './events'
import { config } from './config'

loadEvents(config, ipcMain);

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

function loadApp(window){
  window.loadURL(`file://${__dirname}/app/app.html`);
  window.show();
}

function abortApp(window, error){
  console.log(error);
  alert(`Oops! Something went wrong. Error message: ${error}`);
  window.destroy();
}

app.on('ready', async () => {
  await installExtensions();

  // Your Spotify Applications Credentials
  var options = {
    client_id: 'f0ba527fc14e4f8ca26aacbdaebcb815',
    client_secret: '933176ced8484096b38fcb3d5fa1a3de',
    redirectUri: 'http://localhost:3000/callback',
    scopes: ['playlist-read-private', 'playlist-read-collaborative'] // Scopes limit access for OAuth tokens.
  };

  mainWindow = new BrowserWindow({ width: 1024, height: 768, show: false, 'node-integration': false });

  authenticationHandler.getStoredAuthData()
    .then((authenticationData) => {
      if (_.isEmpty(authenticationData)){
        var spotifyUrl = 'https://accounts.spotify.com/authorize?';
        var authUrl = spotifyUrl + 'client_id=' + options.client_id + '&scope=' + options.scopes.join(' ') + '&redirect_uri=' + options.redirectUri + '&response_type=code';
        mainWindow.loadURL(authUrl);
        mainWindow.show();
      } else {
        return authenticationHandler.refreshAuthenticationData(options)
          .then((authenticationData) => {
            loadApp(mainWindow);
          });
      }
    }).catch((error) => abortApp(mainWindow, error));

  function handleSpotifyAuthCallback (url) {
    if(!url.startsWith(options.redirectUri)){
      return;
    }

    var raw_code = /code=(.*)*#_=_/.exec(url) || null;
    var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
    var error = /\?error=(.+)$/.exec(url);

    if (code) {
      authenticationHandler.authenticate(options, code)
        .then((authenticationData) => {
          loadApp(mainWindow);
        });
    } else if (error) {
      abortApp(mainWindow, error);
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
    handleSpotifyAuthCallback(url);
  });

  mainWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
    handleSpotifyAuthCallback(newUrl);
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
