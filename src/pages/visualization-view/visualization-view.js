import React, { useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import InlineSVG from 'react-svg-inline'

import './visualization-view.scss'
import chart from '../../assets/chart.svg'
import sqlIcon from '../../assets/blk-database.svg'
import QueryView from '../query-view'
import ChartView from '../chart-view'
import LoadingElement from '../../components/generic-elements/loading-element'

const VisualizationView = ({ resetVisualization, getVisualization, visualization, match }) => {
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
          <Tab>Visualize<InlineSVG id='chartIcon' style={{ 'marginLeft': '.3rem' }} svg={chart} height='inherit' width={'25px'} accessibilityDesc='Chart' /></Tab>
          <Tab>Write SQL <InlineSVG id='sqlIcon' svg={sqlIcon} height='14px' width='14px' accessibilityDesc='Sql Icon' /></Tab>
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