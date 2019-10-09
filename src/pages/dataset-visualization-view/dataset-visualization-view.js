import PropTypes from 'prop-types';
import './dataset-visualization-view.scss'
import React, { useState } from 'react'
import sqlIcon from '../../assets/blk-database.svg'
import InlineSVG from 'react-svg-inline'

import DatasetQueryView from '../dataset-query-view'
import ChartVisualization from '../../components/visualizations/chart/chart-visualization'
import DatasetRecommendations from '../../components/dataset-recommendations'
import { Collapse } from 'react-collapse'


const DatasetVisualizationView = (props) => {
  const [open, setOpened] = useState(false)
  const toggleOpen = () => { setOpened(!open) }
  const { systemName, dataSources, freestyleQueryText, datasetId } = props
  
  return (
    <dataset-visualization>
      <div className="visualization-header">
        <div className="header">
          <button className='button query-button' onClick={toggleOpen}>
            {open ? 'HIDE QUERY' : 'EDIT QUERY'}
            <InlineSVG id='sqlIcon' svg={sqlIcon} height='14px' width='14px' accessibilityDesc='Sql Icon' />
          </button>
        </div>
        <Collapse isOpened={open}>
          <DatasetQueryView systemName={systemName} freestyleQueryText={freestyleQueryText} />
        </Collapse>
      </div>
      <DatasetRecommendations datasetId={datasetId} />

      <ChartVisualization dataSources={dataSources} />
    </dataset-visualization>
  )
}

DatasetVisualizationView.propTypes = {
  match: PropTypes.object.isRequired,
  systemName: PropTypes.string.isRequired,
  datasetId: PropTypes.string.isRequired,
  dataSources: PropTypes.object.isRequired,
  freestyleQueryText: PropTypes.string,
}

export default DatasetVisualizationView
