import { app, BrowserWindow, Menu, shell, ipcMain } from 'electron';
import _ from 'lodash';
import * as authenticationHandler from './app/utils/authenticationHandler'
import loadEvents from './events'
import { config } from './config'
import { SPOTIFY } from './constants';

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

  mainWindow = new BrowserWindow({ width: 1024, height: 768, show: false, 'node-integration': false });
  mainWindow.userConfig = config;

  authenticationHandler.getStoredAuthData()
    .then((authenticationData) => {
      if (_.isEmpty(authenticationData)){
        let spotifyUrl = 'https://accounts.spotify.com/authorize';
        let authUrl = `${spotifyUrl}?client_id=${SPOTIFY.CLIENT_ID}&scope=${SPOTIFY.SCOPES.join(' ')}&redirect_uri=${SPOTIFY.REDIRECT_URI}&response_type=code`;
        mainWindow.loadURL(authUrl);
        mainWindow.show();
      } else {
        return authenticationHandler.refreshAuthenticationData(SPOTIFY)
          .then((authenticationData) => {
            loadApp(mainWindow);
          });
      }
    }).catch((error) => abortApp(mainWindow, error));

  function handleSpotifyAuthCallback (url) {
    if(!url.startsWith(SPOTIFY.REDIRECT_URI)){
      return;
    }

    let raw_code = /code=(.*)*#_=_/.exec(url) || null;
    let code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
    let error = /\?error=(.+)$/.exec(url);

    if (code) {
      authenticationHandler.authenticate(SPOTIFY, code)
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
