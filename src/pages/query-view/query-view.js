import './query-view.scss'
import React, { useState } from 'react'

import DatasetQuery from '../../components/dataset-query'
import ReactTable from 'react-table'
import LoadingElement from '../../components/generic-elements/loading-element'

const QueryView = (props) => {
  const { dataSources, queryResults, queryText } = props

  const [hasUserSubmittedQuery, setHasUserSubmittedQuery] = useState(false)

  const columns = Object.keys(dataSources).map((col) => {
    return { Header: col, accessor: col, headerClassName: 'table-header' }
  })

  const data = queryResults ? cleanseData(queryResults) : queryResults
  const numRecords = queryResults ? data.length + " records returned" : ""

  const onQuery = (query) => {
    query && props.onQuery(query)
    setHasUserSubmittedQuery(true)
  }

  const onInit = () => {
    onQuery(queryText)
  }

  const isPageLoadingForFirstTime = props.isLoading && !hasUserSubmittedQuery

  // Using the react prefix as short term solution to allow
  // for shallow rendering of components
  React.useEffect(onInit, [])

  if (isPageLoadingForFirstTime) {
    return (
      <query-view>
        <LoadingElement />
      </query-view>
    )
  }

  return (
    <query-view>
      <DatasetQuery
        defaultQuery={queryText}
        onQueryDataset={onQuery}
        hasUserSubmittedQuery={hasUserSubmittedQuery}
      />
      <div id='dataset-preview-table'>
        <div id='numRecords'>{numRecords}</div>
        <ReactTable data={data} defaultPageSize={10} columns={columns} className='-striped -highlight'></ReactTable>
      </div>
    </query-view>
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

export default QueryView
