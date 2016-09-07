import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.global.css';
import storage from 'electron-json-storage';
import { fetchUserInfo } from './actions/auth';

const initializePage = function (tokenData){
  const store = configureStore({auth: {tokenData: tokenData}});
  const history = syncHistoryWithStore(hashHistory, store);

  store.dispatch(fetchUserInfo(tokenData.accessToken));

  render(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('root')
  );
};

storage.get('auth', function(error, tokenData) {
  if (error) throw error;

  initializePage(tokenData);
});
