import React, { useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import './visualization-view.scss'
import QueryView from '../query-view'
import ChartView from '../chart-view'
import LoadingElement from '../../components/generic-elements/loading-element'
import ChartIcon from '../../components/generic-elements/chart-icon'
import SQLIcon from '../../components/generic-elements/sql-icon'

const VisualizationView = ({ resetVisualization, getVisualization, createVisualization, visualization, match }) => {
  const { id } = match.params

  useEffect(() => { resetVisualization() && getVisualization(id) }, [])

  if (visualization.loading) {
    return (
      <visualization-view>
        <LoadingElement />
      </visualization-view>
    )
  }

  return (
    <visualization-view>
      <Tabs className='visualization-view' >
        <TabList>
          <Tab>Visualize <ChartIcon className='chartIcon'/></Tab>
          <Tab>Write SQL <SQLIcon className='sqlIcon'/></Tab>
          <li style={{float: 'right'}} className="react-tabs__tab" onClick={() => createVisualization(visualization.title, visualization.query)}>Save Visualization</li>
        </TabList>
        <TabPanel>
          <ChartView queryText={visualization.query} />
        </TabPanel>
        <TabPanel>
          <QueryView queryText={visualization.query} />
        </TabPanel>
      </Tabs>
    </visualization-view>
  )
}
export default VisualizationView