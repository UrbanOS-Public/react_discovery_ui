
import './App.scss'

import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import DataSetListViewWrapper from './pages/dataset-list-view'
import DatasetView from './pages/dataset-detail-view'
const DatasetVisualizationView = lazy(() => import('./pages/dataset-visualization-view'))
import LoginView from './pages/login-view'

import NetworkLoadingElement from './components/network-loading-element'
import LoadingElement from './components/generic-elements/loading-element'

import routes from './routes'

const noMatch = () => (
  <Redirect to='/' />
)

const DiscoveryUI = () => (
  <main-app-element>
    <NetworkLoadingElement />
    <Router>
      <Suspense fallback={<LoadingElement />}>
        <Switch>
          <Route exact path={routes.root} component={DataSetListViewWrapper} />
          <Route exact path={routes.datasetView} component={DatasetView} />
          <Route exact path={routes.datasetVisualizationView} component={DatasetVisualizationView} />
          <Route exact path={routes.healthCheck} component={() => <div>Everything is fine</div>} />
          <Route exact path={routes.login} component={LoginView} /> :
          <Route component={noMatch} />
        </Switch>
      </Suspense>
    </Router>
  </main-app-element>
)

export default DiscoveryUI
