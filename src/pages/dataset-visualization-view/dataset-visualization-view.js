import './dataset-visualization-view.scss'
import React, { Component, useState, useEffect } from 'react'
import sqlIcon from '../../assets/blk-database.svg'
import InlineSVG from 'react-svg-inline'

import ChartVisualization from '../../components/visualizations/chart/chart-visualization'
import routes from '../../routes'
import qs from 'qs'
import DatasetQuery from '../../components/dataset-query'
import ReactTable from 'react-table'
import { Collapse } from 'react-collapse'
import { GeneratedLink } from '../../components/generic-elements/generated-link'
import LoadingElement from '../../components/generic-elements/loading-element'

const DatasetVisualizationView = (props) => {
  const [open, setOpened] = useState(false)
  const toggleOpen = () => { setOpened(!open) }
  const [hasUserSubmittedQuery, setHasUserSubmittedQuery] = useState(false)

  const { match: { params }, dataSources, location: { search }, queryData } = props
  const { systemName } = qs.parse(search, { ignoreQueryPrefix: true })
  const columns = Object.keys(dataSources).map((col) => {
    return { Header: col, accessor: col, headerClassName: 'table-header' }
  })

  const data = queryData ? cleanseData(queryData) : queryData
  const numRecords = queryData ? data.length+" records returned" : ""
  
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
          <GeneratedLink className='backLink' path={routes.datasetView} params={params}>
            <strong>{'<'} BACK TO DATASET</strong>
          </GeneratedLink>
          <button className='button query-button' onClick={toggleOpen}>
              {open ? 'HIDE QUERY' : 'EDIT QUERY'}
              <InlineSVG id='sqlIcon' svg={sqlIcon} height='14px' width='14px' accessibilityDesc='Sql Icon' />
          </button>
        </div>
        <Collapse isOpened={open}>
          <DatasetQuery
            defaultQuery={defaultQuery}
            onQueryDataset={onQueryDataset}
            hasUserSubmittedQuery={hasUserSubmittedQuery} />
          <div id='dataset-preview-table'>
          <div id='numRecords'>{numRecords}</div>
            <ReactTable data={data} defaultPageSize={10} columns={columns} className='-striped -highlight'></ReactTable>
          </div>
        </Collapse>
      </div>
      <ChartVisualization dataSources={dataSources} />
    </dataset-visualization>
  )
}

const cleanseData = (data) => {
  return data.map(row => cleanseRow(row))
}

const cleanseRow = row => {
  const deconstructedObject = Object.entries(row)
  const listOfKeyValues = deconstructedObject.map(field =>
    ({ [field[0]]: cleanseField(field[1]) })
  )
  const reconstructedObject = Object.assign({}, ...listOfKeyValues)

  return reconstructedObject
}

const cleanseField = value => {
  if (typeof value === 'boolean') {
    return value.toString()
  }
  return value
}



export default DatasetVisualizationView
