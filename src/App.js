
import './App.scss'
import 'normalize.css'

import React from 'react'
import sagas from './store/sagas'
import { reducers } from './store/reducers'
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import DataSetListViewWrapper from './pages/dataset-list-view'
import DatasetView from './pages/dataset-detail-view'
import DatasetVisualizationView from './pages/dataset-visualization-view'
import LoginView from './pages/login-view'

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

const DiscoveryUI = () => (
  <main-app-element>
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
    <Provider store={store}>
      <DiscoveryUI />
    </Provider>)
}

export default WrappedApp
