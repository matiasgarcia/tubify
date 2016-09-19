import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import routes from './routes';
import configureStore from './store/configureStore';
import { getStoredAuthData } from './utils/authenticationHandler';
import { remote } from 'electron';

injectTapEventPlugin();

const initializePage = function (auth){
  let userConfig = remote.getCurrentWindow().userConfig;
  const store = configureStore({auth, config: userConfig});
  const history = syncHistoryWithStore(hashHistory, store);

  render(
    <MuiThemeProvider>
      <Provider store={store}>
          <Router history={history} routes={routes} />
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
  );
};

getStoredAuthData()
  .then((authenticationData) => initializePage(authenticationData))
  .catch((error) => {throw error});
