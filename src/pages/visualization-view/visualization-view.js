import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import './visualization-view.scss'
import LoadingElement from '../../components/generic-elements/loading-element'
import ChartIcon from '../../components/generic-elements/chart-icon'
import SQLIcon from '../../components/generic-elements/sql-icon'
import TabButton from '../../components/generic-elements/tab-button'
import SaveIcon from '@material-ui/icons/Save'
import ChartView from '../chart-view'
import QueryView from '../query-view'
import ErrorComponent from '../../components/generic-elements/error-component'

const VisualizationView = (props) => {
  const {
    resetVisualization,
    getVisualization,
    createVisualization,
    query,
    isLoading,
    isSaving,
    isError,
    isSavable,
    match
  } = props

  React.useEffect(() => {
    resetVisualization()
    const { id } = match.params
    if (id) { getVisualization(id) }
  }, [])

  const onSave = () => {
    createVisualization("Placeholder Title", query)
  }

  if (isLoading) {
    return (
      <visualization-view>
        <LoadingElement className='loading-spinner' />
      </visualization-view>
    )
  }

  if (isError) {
    return (
      <visualization-view>
        <ErrorComponent errorText='We were unable to fetch the requested visualization' />
      </visualization-view>
    )
  }

  // TODO
  // test driving save click
  // - save spinner
  // - link for where to get visualization

  return (
    <visualization-view>
      <Tabs>
        <TabList className='header'>
          <span className='tab-area'>
            <Tab className='header-item tab' selectedClassName='selected'>Visualize <ChartIcon className='chart-icon' /></Tab>
            <Tab className='header-item tab' selectedClassName='selected'>Write SQL <SQLIcon className='sql-icon' /></Tab>
          </span>
          <span className='action-area'>
            {
              isSaving
              ? <LoadingElement className='header-item saving-spinner' />
              : <TabButton className='header-item save-button' disabled={!isSavable} onClick={onSave} >
                <SaveIcon />
              </TabButton>
            }
          </span>
        </TabList>
        <TabPanel>
          <ChartView />
        </TabPanel>
        <TabPanel>
          <QueryView />
        </TabPanel>
      </Tabs>
    </visualization-view>
  )
}
export default VisualizationView