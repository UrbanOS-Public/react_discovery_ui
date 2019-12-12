
import './ReactDiscoveryUI.scss'
import 'normalize.css'

import React from 'react'
import sagas from './store/sagas'
import { reducers } from './store/reducers'
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import DataSetListViewWrapper from './pages/dataset-list-view'
import DatasetView from './pages/dataset-view'
import LoginView from './pages/login-view'
import OAuthView from './pages/oauth-view'
import VisualizationView from './pages/visualization-view'
import UserProfileView from './pages/user-profile-view'

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
  return (<main-app-element>
    <NetworkLoadingElement />
    <Router>
      <Switch>
        <Route exact path={routes.root} component={DataSetListViewWrapper} />
        <Route exact path={routes.datasetView} component={DatasetView} />
        <Redirect exact path={routes.datasetVisualizationView} to={{ pathname: routes.datasetView, search: '?selectedIndex=1' }} />
        <Route exact path={routes.healthCheck} component={() => <div>Everything is fine</div>} />
        <Route exact path={routes.login} component={LoginView} />
        <Route exact path={routes.oauth} component={OAuthView} />
        <Route exact path={routes.visualizationView} component={VisualizationView} />
        <Route exact path={routes.userProfile} component={UserProfileView} />
        <Route component={noMatch} />
      </Switch>
    </Router>
  </main-app-element>)
}

const ReactDiscoveryUI = () => {
  const store = Redux.start()

  return (
    <Provider store={store}>
      <DiscoveryUI />
    </Provider>
  )
}

export default ReactDiscoveryUI
