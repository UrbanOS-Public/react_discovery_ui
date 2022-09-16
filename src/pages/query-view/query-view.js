import './query-view.scss'
import React, { useState } from 'react'

import QueryForm from '../../components/query-form'
import DataView from '../../components/data-view'
import LoadingElement from '../../components/generic-elements/loading-element'
import _ from 'lodash'

const QueryView = props => {
  const {
    dataSources,
    recommendations,
    usedDatasets,
    datasetReferences,
    isQueryLoading,
    isQueryDataAvailable,
    freestyleQueryText,
    queryData,
    queryFailureMessage,
    shouldAutoExecuteQuery,

    executeQuery,
    cancelQuery,
    setQueryText
  } = props

  const [page, setPage] = useState(0)

  const onNextPageClicked = (pageNumber) => {
    setPage(pageNumber)
  }

  React.useEffect(() => {
    if (shouldAutoExecuteQuery) {
      executeQuery(freestyleQueryText)
    }
  }, [shouldAutoExecuteQuery])

  React.useEffect(() => {
    setPage(0)
  }, [queryData])

  const numRecords = queryData ? queryData.length + ' records returned' : ''

  if (isQueryLoading && queryData.length === 0) {
    return (
      <query-view>
        <LoadingElement />
      </query-view>
    )
  }

  return (
    <query-view data-testid='query-view'>
      <QueryForm
        recommendations={recommendations}
        usedDatasets={usedDatasets}
        datasetReferences={datasetReferences}

        queryFailureMessage={queryFailureMessage}
        isQueryLoading={isQueryLoading}
        isQueryDataAvailable={isQueryDataAvailable}
        queryText={freestyleQueryText}
        queryData={queryData}

        executeQuery={executeQuery}
        cancelQuery={cancelQuery}
        setQueryText={setQueryText}
      />
      <div id='dataset-preview-table'>
        <div id='numRecords'>{numRecords}</div>
        <DataView
          data={queryData}
          page={page}
          columns={Object.keys(dataSources)}
          onNextPageClicked={onNextPageClicked}
        />
      </div>
    </query-view>
  )
}

export default QueryView
