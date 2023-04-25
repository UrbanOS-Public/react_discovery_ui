import React, { Component } from 'react'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import ChartIcon from '../../components/generic-elements/chart-icon'
import SQLIcon from '../../components/generic-elements/sql-icon'
import qs from 'qs'
import routes from '../../routes'
import { generatePath } from 'react-router'

import './dataset-view.scss'
import QueryView from '../query-view'
import ChartView from '../chart-view'
import DatasetDetailView from '../dataset-detail-view'
import LoadingElement from '../../components/generic-elements/loading-element'
import VisualizationListMenuItem from '../../components/visualization-list-menu-item'
import VisualizationSaveMenuItem from '../../components/visualization-save-menu-item'

export default class extends Component {
  constructor() {
    super()
    this.state = { index: 0, localTitle: '' }
  }

  generateVisualizationLink() {
    return this.props.visualizationId && generatePath(routes.visualizationView, { id: this.props.visualizationId })
  }

  componentDidMount() {
    this.props.reset()
    this.props.retrieveDatasetDetails(
      this.props.match.params.organizationName,
      this.props.match.params.datasetName
    )

    if (this.state.index != this.getIndexFromQueryParams()) {
      this.setState({ index: this.getIndexFromQueryParams() })
    }
  }

  getIndexFromQueryParams() {
    const { selectedIndex } = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    })
    return selectedIndex ? parseInt(selectedIndex) : 0
  }

  handleTitleChange(event) {
    if (event.target.value !== this.state.localTitle) {
      this.setState({ localTitle: event.target.value })
    }
  }

  handleSaveOrUpdate({ shouldCreateCopy }) {
    this.props.save({ id: this.props.visualizationId, title: this.state.localTitle, query: this.props.query, shouldCreateCopy })
  }

  isNotDatasetDetailsTab() {
    return this.state.index !== 0
  }

  isVisualizationEnabled() {
    return window.DISABLE_VISUALIZATIONS === 'false'
  }

  render() {
    if (!this.props.isDatasetLoaded) {
      return (
        <dataset-view>
          <LoadingElement />
        </dataset-view>
      )
    }

    if (this.props.isRemoteDataset || this.props.isHostDataset) {
      return (
        <dataset-view>
          <DatasetDetailView />
        </dataset-view>
      )
    }

    return (
      <dataset-view>
        <Tabs
          className='dataset-view'
          selectedIndex={this.state.index}
          onSelect={tabIndex => this.setState({ index: tabIndex })}
        >
          <TabList className='header'>
            <span className='tab-area'>
              <Tab data-testid='dataset-details'>Dataset Details</Tab>
              <Tab data-testid='dataset-write-sql'>Write SQL <SQLIcon className='sqlIcon' /></Tab>
              {this.isVisualizationEnabled() &&
                <Tab data-testid='visualize'>Visualize <ChartIcon className='chartIcon' /></Tab>
              }
              {this.isNotDatasetDetailsTab() &&
                <>
                  <a role="link" className='helpLink primary-color' target='_blank' href='https://en.wikipedia.org/wiki/SQL_syntax'>SQL Help&nbsp;&nbsp;</a>
                  {this.isVisualizationEnabled() &&
                    <a role="link" id='plotlyhelp' className='helpLink primary-color' target='_blank' href='https://plotly.com/chart-studio-help/tutorials/#basic'>Plot.ly Help</a>
                  }

                </>}
            </span>
            {this.isNotDatasetDetailsTab() &&
              <span className='action-area'>
                <VisualizationListMenuItem
                  isAuthenticated={this.props.auth.isAuthenticated}
                />
                <VisualizationSaveMenuItem
                  isSaveable={this.props.isSaveable}
                  handleTitleChange={this.handleTitleChange.bind(this)}
                  handleSaveOrUpdate={this.handleSaveOrUpdate.bind(this)}
                  linkUrl={this.generateVisualizationLink()}
                  isSaveFailure={this.props.isSaveFailure}
                  isSaveSuccess={this.props.isSaveSuccess}
                  title={this.state.localTitle}
                  allowedActions={this.props.allowedActions}
                  isAuthenticated={this.props.auth.isAuthenticated}
                />
              </span>}
          </TabList>
          <TabPanel forceRender>
            <DatasetDetailView />
          </TabPanel>
          <TabPanel>
            <QueryView shouldAutoExecuteQuery={this.props.shouldAutoExecuteQuery} />
          </TabPanel>
          {this.isVisualizationEnabled() &&
            <TabPanel className='visualization' selectedClassName='visualization--selected'>
              <ChartView shouldAutoExecuteQuery={this.props.shouldAutoExecuteQuery} />
            </TabPanel>
          }

        </Tabs>
      </dataset-view>
    )
  }
}
