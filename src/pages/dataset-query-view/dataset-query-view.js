import './dataset-query-view.scss'
import React, { useState } from 'react'

import qs from 'qs'
import DatasetQuery from '../../components/dataset-query'
import ReactTable from 'react-table'
import LoadingElement from '../../components/generic-elements/loading-element'

const DatasetQueryView = (props) => {
  const { systemName, dataSources, queryData, freestyleQueryText } = props
  // const { systemName } = location ? qs.parse(location.search, { ignoreQueryPrefix: true }) : ""

  const sysName = systemName ? systemName : qs.parse(location.search, { ignoreQueryPrefix: true }).systemName

  const [hasUserSubmittedQuery, setHasUserSubmittedQuery] = useState(false)

  const columns = Object.keys(dataSources).map((col) => {
    return { Header: col, accessor: col, headerClassName: 'table-header' }
  })

  const data = queryData ? cleanseData(queryData) : queryData
  const numRecords = queryData ? data.length + " records returned" : ""

  const onQueryDataset = (query) => {
    props.onQueryDataset(query)
    setHasUserSubmittedQuery(true)
  }

  const defaultQuery = `SELECT * FROM ${sysName}\nLIMIT 20000`

  const query = freestyleQueryText || defaultQuery

  const onInit = () => {
    onQueryDataset(query)
  }

  const isPageLoadingForFirstTime = props.isLoading && !hasUserSubmittedQuery

  // Using the react prefix as short term solution to allow
  // for shallow rendering of components
  React.useEffect(onInit, [])

  if (isPageLoadingForFirstTime) {
    return (
      <dataset-query-page>
        <LoadingElement />
      </dataset-query-page>
    )
  }

  return (
    <dataset-query-page>
      <DatasetQuery
        defaultQuery={query}
        onQueryDataset={onQueryDataset}
        hasUserSubmittedQuery={hasUserSubmittedQuery}
      />
      <div id='dataset-preview-table'>
        <div id='numRecords'>{numRecords}</div>
        <ReactTable data={data} defaultPageSize={10} columns={columns} className='-striped -highlight'></ReactTable>
      </div>
    </dataset-query-page>
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



export default DatasetQueryView
