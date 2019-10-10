import React from 'react'
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
    title,
    isLoading,
    isError,
    match
  } = props

  React.useEffect(() => {
    resetVisualization()
    const { id } = match.params
    if (id) { getVisualization(id) }
  }, [])

  if (isLoading) {
    return (
      <visualization-view>
        <LoadingElement />
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
  // - disabled
  // - save spinner
  // - link for where to get visualization

  return (
    <visualization-view>
      <Tabs className='visualization-view' >
        <TabList>
          <Tab>Visualize <ChartIcon className='chartIcon' /></Tab>
          <Tab>Write SQL <SQLIcon className='sqlIcon' /></Tab>
          <TabButton style={{float: 'right'}} disabled={!query} className='save-button' onClick={() => createVisualization("Placeholder Title", query)} ><SaveIcon /></TabButton>
          {/* onClick={() => createVisualization("Placeholder Title", query)} */}
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