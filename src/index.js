
import App from './App.js'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Auth0Provider } from "./react-auth0-wrapper";
import 'regenerator-runtime/runtime'
import TagManager from 'react-gtm-module'
window.React = React

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  console.log("redirect callback appState", appState)
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

const tagManagerArgs = {
  gtmId: window.GTM_ID
}

TagManager.initialize(tagManagerArgs)

ReactDOM.render(
  <Auth0Provider
    domain={"dev-smartos.auth0.com"}
    client_id={"KKSxRc1Wjjr74I1KL2SlrmVIsuu7YREc"}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
>
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

