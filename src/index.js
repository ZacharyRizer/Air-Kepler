import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from './react-auth0-spa';
import { Grommet } from 'grommet';
import theme from './theme';
import { ContextProvider } from './Context';
import config from './auth_config.json';
import history from './utils/history';

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    audience={config.audience}
    onRedirectCallback={onRedirectCallback}>
    <ContextProvider>
      <Grommet theme={theme} full>
        <App />
      </Grommet>
    </ContextProvider>
  </Auth0Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
