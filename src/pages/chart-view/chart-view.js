import PropTypes from 'prop-types';
import './chart-view.scss'
import React from 'react'

import ChartVisualization from '../../components/visualizations/chart/chart-visualization'
import LoadingElement from '../../components/generic-elements/loading-element'

const hasDataSources = dataSources => {
  return dataSources && Object.keys(dataSources).length > 0
}

const ChartView = (props) => {
  const { dataSources, isLoading, autoFetchQuery, executeQuery } = props

  React.useEffect(() => {
    if (autoFetchQuery) {
      executeQuery()
    }
  }, [autoFetchQuery])

  if (isLoading) {
    return (
      <chart-view>
        <LoadingElement />
      </chart-view>
    )
  }

  if (!hasDataSources(dataSources)) {
    return (
      <chart-view>
        <div className='no-data-message'>Unable to load data. You may need to revise your query.</div>
      </chart-view>
    )
  }

  return (
    <chart-view>
      <ChartVisualization dataSources={dataSources} />
    </chart-view>
  )
}

ChartView.propTypes = {
  dataSources: PropTypes.object.isRequired,
  isQueryLoading: PropTypes.bool,
  autoFetchQuery: PropTypes.bool,
  executeQuery: PropTypes.func.isRequired
}

export default ChartView
