import './chart-view.scss'
import React, { useState } from 'react'
import sqlIcon from '../../assets/blk-database.svg'
import InlineSVG from 'react-svg-inline'

import QueryView from '../query-view'
import ChartVisualization from '../../components/visualizations/chart/chart-visualization'
import { Collapse } from 'react-collapse'
import LoadingElement from '../../components/generic-elements/loading-element'

const ChartView = (props) => {
  const [open, setOpened] = useState(false)
  const toggleOpen = () => { setOpened(!open) }
  const { dataSources, queryText, queryResults } = props

  const isPageLoading = props.isLoading && !queryResults

  if (isPageLoading) {
    return (
      <dataset-visualization>
        <LoadingElement />
      </dataset-visualization>
    )
  }

  return (
    <chart-view>
      <div className="visualization-header">
        <div className="header">
          <button className='button query-button' onClick={toggleOpen}>
            {open ? 'HIDE QUERY' : 'EDIT QUERY'}
            <InlineSVG id='sqlIcon' svg={sqlIcon} height='14px' width='14px' accessibilityDesc='Sql Icon' />
          </button>
        </div>
        <Collapse isOpened={open}>
          <QueryView queryText={queryText} />
        </Collapse>
      </div>
      <ChartVisualization dataSources={dataSources} />
    </chart-view>
  )
}


export default ChartView
