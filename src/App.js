
import './App.scss'
import 'normalize.css'

import React, {withContext} from 'react'
import sagas from './store/sagas'
import { reducers } from './store/reducers'
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { Auth0Provider, useAuth0 } from "./auth/react-auth0-wrapper";
import { AuthenticatedHTTPClient } from './utils/http-clients'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import DataSetListViewWrapper from './pages/dataset-list-view'
import DatasetView from './pages/dataset-view'
import LoginView from './pages/login-view'
import OauthView from './pages/oauth-view'

import NetworkLoadingElement from './components/network-loading-element'

import routes from './routes'

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

const DiscoveryUI = () => {
  // with authoprovider
  //  if (isAuthenticated) {
    //   let token = await authoprovider.getTokenSilently()
    //   AuthenticatedHTTPClient.setClient(token)
  //  }
  // const auth0 = useAuth0()

  // console.log("before check")
  // if (auth0.isAuthenticated) {
  //   console.log("logged in", auth0.token)
  //   AuthenticatedHTTPClient.setClient(auth0.token)
  // }
  // console.log("after check")

  return (<main-app-element>
    <NetworkLoadingElement />
    <Router>
      <Switch>
        <Route exact path={routes.root} component={DataSetListViewWrapper} />
        <Route exact path={routes.datasetView} component={DatasetView} />
        <Redirect exact path={routes.datasetVisualizationView} to={{ pathname: routes.datasetView, search: '?selectedIndex=1' }} />
        <Route exact path={routes.healthCheck} component={() => <div>Everything is fine</div>} />
        <Route exact path={routes.login} component={LoginView} />
        <Route exact path={routes.oauth} component={OauthView} />
        <Route component={noMatch} />
      </Switch>
    </Router>
  </main-app-element>)
}

const WrappedApp = () => {
  const store = Redux.start()

  return (
    <Auth0Provider>
      <Provider store={store}>
          <DiscoveryUI />
      </Provider>
    </Auth0Provider>
  )
}

export default WrappedApp
