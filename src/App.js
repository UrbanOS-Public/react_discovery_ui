import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import DataSetListViewWrapper from './pages/dataset-list-view'
import DatasetView from './pages/dataset-detail-view'
const DatasetVisualizationView = lazy(() => import('./pages/dataset-visualization-view'))
import LoginView from './pages/login-view'
import NetworkLoadingElement from './components/network-loading-element'
import LoadingElement from './components/generic-elements/loading-element'
import './App.scss'

const noMatch = () => (
  <Redirect to='/' />
)
const DiscoveryUI = () => (
  <main-app-element>
    <NetworkLoadingElement />
    <Router>
      <Suspense fallback={<LoadingElement />}>
        <Switch>
          <Route exact path='/' component={DataSetListViewWrapper} />
          <Route exact path='/dataset/:organization_name/:dataset_name' component={DatasetView} />
          <Route exact path='/dataset/:organization_name/:dataset_name/visualization' component={DatasetVisualizationView} />
          <Route exact path='/healthcheck' component={() => <div>Everything is fine</div>} />
          <Route exact path='/login' component={LoginView} /> :
          <Route component={noMatch} />
        </Switch>
      </Suspense>
    </Router>
  </main-app-element>
)

export default DiscoveryUI
