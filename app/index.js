import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import { getStoredAuthData } from './utils/authenticationHandler'

const initializePage = function (auth){
  const store = configureStore({auth});
  const history = syncHistoryWithStore(hashHistory, store);

  render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('root')
  );
};

getStoredAuthData()
  .then((authenticationData) => initializePage(authenticationData))
  .catch((error) => {throw error});
