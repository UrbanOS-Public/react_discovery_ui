import PropTypes from 'prop-types';
import './chart-view.scss'
import React from 'react'

import ChartVisualization from '../../components/visualizations/chart/chart-visualization'
import LoadingElement from '../../components/generic-elements/loading-element'

const ChartView = (props) => {
  const { dataSources, isQueryLoading, autoFetchQuery, executeQuery } = props

  React.useEffect(() => {
    if (autoFetchQuery) {
      executeQuery()
    }
  }, [autoFetchQuery])

  if (isQueryLoading) {
    return (
      <dataset-visualization>
        <LoadingElement />
      </dataset-visualization>
    )
  }

  return (
    <dataset-visualization>
      <ChartVisualization dataSources={dataSources} />
    </dataset-visualization>
  )
}

ChartView.propTypes = {
  dataSources: PropTypes.object.isRequired,
  isQueryLoading: PropTypes.bool,
  autoFetchQuery: PropTypes.bool,
  executeQuery: PropTypes.func.isRequired
}

export default ChartView
