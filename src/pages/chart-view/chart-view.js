import './chart-view.scss'
import React, { useState } from 'react'

import SQLIcon from '../../components/generic-elements/sql-icon'

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
      <chart-view>
        <LoadingElement />
      </chart-view>
    )
  }

  return (
    <chart-view>
      <div className="visualization-header">
        <div className="header">
          <button className='button query-button' onClick={toggleOpen}>
            {open ? 'HIDE QUERY' : 'EDIT QUERY'}
            <SQLIcon className='sqlIcon' />
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
