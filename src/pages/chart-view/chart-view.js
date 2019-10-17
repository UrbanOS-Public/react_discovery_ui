import PropTypes from 'prop-types';
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
  const { systemName, dataSources, queryDataInitialized, isQueryLoading, datasetId } = props

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
          <QueryView />  {/* systemName={systemName} /> /* } */}
        </Collapse>
      </div>
      <ChartVisualization dataSources={dataSources} />
    </dataset-visualization>
  )
}

ChartView.propTypes = {
  // systemName: PropTypes.string.isRequired,
  // datasetId: PropTypes.string.isRequired,
  dataSources: PropTypes.object.isRequired
}

export default ChartView
