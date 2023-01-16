import PropTypes from 'prop-types'
import './chart-view.scss'
import React from 'react'
import 'react-chart-editor/lib/react-chart-editor.ie.css'
import PlotlyEditor, { dereference, DefaultEditor } from 'react-chart-editor/lib'

import plotly from 'plotly.js/dist/plotly'
import { cloneDeep } from 'lodash'


import LoadingElement from '../../components/generic-elements/loading-element'

const hasDataSources = dataSources => {
  return dataSources && Object.keys(dataSources).length > 0
}

const getDataSourceOptions = dataSources => {
  return Object.keys(dataSources).map(name => ({
    value: name,
    label: name
  }))
}

const ChartView = (props) => {
  const { dataSources, isLoading, shouldAutoExecuteQuery, executeQuery, setChartInformation, chart } = props
  const { data, layout, frames } = chart

  React.useEffect(() => {
    if (shouldAutoExecuteQuery) {
      executeQuery()
    }
  }, [shouldAutoExecuteQuery])

  React.useEffect(() => {
    const clonedData = cloneDeep(data)
    dereference(clonedData, dataSources)
    setChartInformation({ data: clonedData, layout, frames })
  }, [dataSources])

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

  const onUpdate = (data, layout, frames) => {
    setChartInformation({ data, layout, frames })
  }

  return (
    <chart-view>
      <PlotlyEditor
        data={data}
        layout={layout}
        frames={frames}
        dataSources={dataSources}
        dataSourceOptions={getDataSourceOptions(dataSources)}
        plotly={plotly}
        onUpdate={onUpdate}
        advancedTraceTypeSelector
        useResizeHandler
        config={{ mapboxAccessToken: window.MAPBOX_ACCESS_TOKEN }}
        data-testid='plotly-editor'
      >
        <DefaultEditor logoSrc={window.LOGO_URL} />
      </PlotlyEditor>
    </chart-view>
  )
}

ChartView.propTypes = {
  dataSources: PropTypes.object.isRequired,
  isQueryLoading: PropTypes.bool,
  shouldAutoExecuteQuery: PropTypes.bool,
  executeQuery: PropTypes.func.isRequired
}

export default ChartView
