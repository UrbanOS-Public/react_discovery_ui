import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import './visualization-view.scss'
import LoadingElement from '../../components/generic-elements/loading-element'
import ChartIcon from '../../components/generic-elements/chart-icon'
import SQLIcon from '../../components/generic-elements/sql-icon'
import ChartView from '../chart-view'
import QueryView from '../query-view'

const VisualizationView = ({ resetVisualization, getVisualization, createVisualization, query, visualization, match }) => {
  const { id } = match.params

  React.useEffect(() => { resetVisualization() && getVisualization(id) }, [])

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
          <li style={{float: 'right'}} className="react-tabs__tab" onClick={() => createVisualization(visualization.title, query)}>Save Visualization</li>
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