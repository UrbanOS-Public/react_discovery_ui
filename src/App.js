import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import DataSetListViewWrapper from './pages/dataset-list-view'
import DatasetView from './pages/dataset-detail-view'
import DatasetVisualizationView from './pages/dataset-visualization-view';
import LoginView from './pages/login-view'
import NetworkLoadingElement from './components/network-loading-element'
import './App.scss'

const noMatch = () => (
  <Redirect to='/' />
)
const BasicExample = () => (
  <main-app-element>
    <NetworkLoadingElement />
    <Router>
      <Switch>
        <Route exact path='/' component={DataSetListViewWrapper} />
        <Route exact path='/dataset/:organization_name/:dataset_name' component={DatasetView} />
        <Route exact path='/dataset/:organization_name/:dataset_name/visualization' component={DatasetVisualizationView} />
        <Route exact path='/healthcheck' component={() => <div>Everything is fine</div>} />
        <Route exact path='/login' component={LoginView} /> :
        <Route component={noMatch} />
      </Switch>
    </Router>
  </main-app-element>
)

export default BasicExample
