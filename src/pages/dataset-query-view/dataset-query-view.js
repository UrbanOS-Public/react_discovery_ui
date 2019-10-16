import "./dataset-query-view.scss";
import React, { useState } from "react";

import DatasetQuery from "../../components/dataset-query";
import ReactTable from "react-table";
import LoadingElement from "../../components/generic-elements/loading-element";

const DatasetQueryView = props => {
  const { 
    dataSources,
    recommendations,
    isQueryLoading,
    freestyleQueryText,
    queryData,
    queryFailureMessage,
    autoFetchQuery,
    userHasInteracted,

    executeQuery,
    cancelQuery,
    setQueryText,
    setUserInteracted,
  } = props;

  React.useEffect(() => {
    if (autoFetchQuery) {
      executeQuery(freestyleQueryText)
    }
  }, [])

  const columns = determineColumns(dataSources)
  const data = getCleanData(queryData)
  
  const numRecords = queryData ? data.length + " records returned" : "";

  if (isQueryLoading && queryData.length === 0) {
    return (
      <dataset-query-page>
        <LoadingElement />
      </dataset-query-page>
    );
  }

  return (
    <dataset-query-page>
      <DatasetQuery
        onQueryDataset={executeQuery}
        recommendations={recommendations}

        queryFailureMessage={queryFailureMessage}
        isQueryLoading={isQueryLoading}
        queryText={freestyleQueryText}
        userHasInteracted={userHasInteracted}

        executeQuery={executeQuery}
        cancelQuery={cancelQuery}
        setQueryText={setQueryText}
        setUserInteracted={setUserInteracted}
      />
      <div id="dataset-preview-table">
        <div id="numRecords">{numRecords}</div>
        <ReactTable
          data={data}
          defaultPageSize={10}
          columns={columns}
          className="-striped -highlight"
        ></ReactTable>
      </div>
    </dataset-query-page>
  );
};

const cleanseData = data => {
  return data.map(row => cleanseRow(row));
};

const cleanseRow = row => {
  const deconstructedObject = Object.entries(row);
  const listOfKeyValues = deconstructedObject.map(field => ({
    [field[0]]: cleanseField(field[1])
  }));
  const reconstructedObject = Object.assign({}, ...listOfKeyValues);

  return reconstructedObject;
};

const cleanseField = value => {
  if (typeof value === "boolean") {
    return value.toString();
  }
  return value;
};

const determineColumns = dataSources => {
  return Object.keys(dataSources).map(col => {
    return { Header: col, accessor: col, headerClassName: "table-header" };
  })
}

const getCleanData = queryData => {
  return queryData ? cleanseData(queryData) : queryData
}

export default DatasetQueryView;
