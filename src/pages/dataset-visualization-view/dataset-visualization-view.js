import './dataset-visualization-view.scss'
import React, { useState } from 'react'
import SQLIcon from '../../components/generic-elements/sql-icon'

import DatasetQueryView from '../dataset-query-view'
import ChartVisualization from '../../components/visualizations/chart/chart-visualization'
import { Collapse } from 'react-collapse'
import LoadingElement from '../../components/generic-elements/loading-element'

const DatasetVisualizationView = (props) => {
  const [open, setOpened] = useState(false)
  const toggleOpen = () => { setOpened(!open) }

  const { systemName, dataSources, queryDataInitialized, isQueryLoading } = props

  const isPageLoading = isQueryLoading && !queryDataInitialized

  if (isPageLoading) {
    return (
      <dataset-visualization>
        <LoadingElement />
      </dataset-visualization>
    )
  }

  return (
    <dataset-visualization>
      <div className="visualization-header">
        <div className="header">
          <button className='button query-button' onClick={toggleOpen}>
            {open ? 'HIDE QUERY' : 'EDIT QUERY'}
            <SQLIcon className='sqlIcon' />
          </button>
        </div>
        <Collapse isOpened={open}>
          <DatasetQueryView systemName={systemName} />
        </Collapse>
      </div>
      <ChartVisualization dataSources={dataSources} />
    </dataset-visualization>
  )
}


export default DatasetVisualizationView
