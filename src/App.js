import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import DataSetListView from './pages/dataset-list-view'
import DatasetView from './pages/dataset'
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
        <Route exact path='/' component={DataSetListView} />
        <Route exact path='/dataset/:id' component={DatasetView} />
        <Route exact path='/healthcheck' component={() => <div>Everything is fine</div>} />
        <Route component={noMatch} />
      </Switch>
    </Router>
  </main-app-element>
)

export default BasicExample
