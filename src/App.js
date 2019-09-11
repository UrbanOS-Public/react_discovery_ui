
import './App.scss'
import 'normalize.css'

import React from 'react'
import sagas from './store/sagas'
import { reducers } from './store/reducers'
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { Auth0Provider } from "./react-auth0-wrapper";

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import DataSetListViewWrapper from './pages/dataset-list-view'
import DatasetView from './pages/dataset-detail-view'
import DatasetVisualizationView from './pages/dataset-visualization-view'
import LoginView from './pages/login-view'

import NetworkLoadingElement from './components/network-loading-element'

import routes from './routes'
import Login from './Login'

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  console.log("onRedirectCallback", appState, document.title, window.location.pathname)
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};


const Redux = {
  start: (reducerMap = {}) => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const sagaMiddleware = createSagaMiddleware()
    const mergedReducers = Object.assign({}, reducers, reducerMap)
    const store = createStore(combineReducers(mergedReducers), composeEnhancers(applyMiddleware(sagaMiddleware)))

    sagaMiddleware.run(sagas)

    return store
  }
}

const noMatch = () => (
  <Redirect to='/' />
)

const DiscoveryUI = () => (
  <main-app-element>
    <Login />
    <NetworkLoadingElement />
    <Router>
      <Switch>
        <Route exact path={routes.root} component={DataSetListViewWrapper} />
        <Route exact path={routes.datasetView} component={DatasetView} />
        <Route exact path={routes.datasetVisualizationView} component={DatasetVisualizationView} />
        <Route exact path={routes.healthCheck} component={() => <div>Everything is fine</div>} />
        <Route exact path={routes.login} component={LoginView} />
        <Route component={noMatch} />
      </Switch>
    </Router>
  </main-app-element>
)

const WrappedApp = () => {
  const store = Redux.start()

  return (
    <Auth0Provider
      domain={"dev-smartos.auth0.com"}
      client_id={"KKSxRc1Wjjr74I1KL2SlrmVIsuu7YREc"}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <Provider store={store}>
        <DiscoveryUI />
      </Provider>
    </Auth0Provider>
  )
}

export default WrappedApp
