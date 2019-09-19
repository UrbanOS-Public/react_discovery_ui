import './dataset-visualization-view.scss'
import React, { useState, useEffect } from 'react'

import ChartVisualization from '../../components/visualizations/chart/chart-visualization'
import routes from '../../routes'
import qs from 'qs'
import DatasetQuery from '../../components/dataset-query'
import { Collapse } from 'react-collapse'
import { GeneratedLink } from '../../components/generic-elements/generated-link'
import LoadingElement from '../../components/generic-elements/loading-element'

const DatasetVisualizationView = (props) => {
  const [open, setOpened] = useState(false)
  const toggleOpen = () => { setOpened(!open) }

  const [hasUserSubmittedQuery, setHasUserSubmittedQuery] = useState(false)

  const { match: { params }, dataSources, location: { search } } = props
  const { systemName } = qs.parse(search, { ignoreQueryPrefix: true })
  const onQueryDataset = (query) => {
    props.onQueryDataset(query)
    setHasUserSubmittedQuery(true)
  }

  const defaultQuery = `SELECT * FROM ${systemName}\nLIMIT 20000`

  const onInit = () => {
    props.onQueryDataset(defaultQuery)
  }

  const isPageLoadingForFirstTime = props.isLoading && !hasUserSubmittedQuery

  // Using the react prefix as short term solution to allow
  // for shallow rendering of components
  React.useEffect(onInit, [])

  if (isPageLoadingForFirstTime) {
    return (
      <dataset-visualization>
        <LoadingElement />
      </dataset-visualization>)
  }

  return (
    <dataset-visualization>
      <div className="visualization-header">
        <div className="header">
          <GeneratedLink className="button" path={routes.datasetView} params={params}>
            Back to Dataset
          </GeneratedLink>
          <button className='button query-button' onClick={toggleOpen}>
            {open ? 'Hide Query' : 'Edit Query'}
          </button>
        </div>
        <Collapse isOpened={open}>
          <DatasetQuery
            defaultQuery={defaultQuery}
            onQueryDataset={onQueryDataset}
            hasUserSubmittedQuery={hasUserSubmittedQuery} />
        </Collapse>
      </div>
      <ChartVisualization dataSources={dataSources} />
    </dataset-visualization>
  )
}

export default DatasetVisualizationView
