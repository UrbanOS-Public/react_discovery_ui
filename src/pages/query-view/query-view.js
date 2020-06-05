import "./query-view.scss";
import React from "react";

import QueryForm from "../../components/query-form";
import DataView from "../../components/data-view";
import ReactTable from "react-table";
import LoadingElement from "../../components/generic-elements/loading-element";
import _ from 'lodash'

const QueryView = props => {
  const {
    dataSources,
    recommendations,
    isQueryLoading,
    isQueryDataAvailable,
    freestyleQueryText,
    queryData,
    queryFailureMessage,
    shouldAutoExecuteQuery,

    executeQuery,
    cancelQuery,
    setQueryText
  } = props;

  React.useEffect(() => {
    if (shouldAutoExecuteQuery) {
      executeQuery(freestyleQueryText)
    }
  }, [shouldAutoExecuteQuery])

  // const columns = determineColumns(dataSources)
  // const data = getCleanData(queryData)

  const numRecords = queryData ? queryData.length + " records returned" : "";

  if (isQueryLoading && queryData.length === 0) {
    return (
      <query-view>
        <LoadingElement />
      </query-view>
    );
  }

  return (
    <query-view data-testid="query-view">
      <QueryForm
        recommendations={recommendations}

        queryFailureMessage={queryFailureMessage}
        isQueryLoading={isQueryLoading}
        isQueryDataAvailable={isQueryDataAvailable}
        queryText={freestyleQueryText}

        executeQuery={executeQuery}
        cancelQuery={cancelQuery}
        setQueryText={setQueryText}
      />
      <div id="dataset-preview-table">
        <div id="numRecords">{numRecords}</div>
        {/* <ReactTable
          data={data}
          defaultPageSize={10}
          columns={columns}
          className="-striped -highlight"
        ></ReactTable> */}
        <DataView data={queryData} columns={Object.keys(dataSources)}></DataView>
      </div>
    </query-view>
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
  } else if (_.isNull(value) || _.isNaN(value)) {
    return ''
  } else if (typeof value === "object") {
    return JSON.stringify(value);
  } else {
    return value;
  }
};

const determineColumns = dataSources => {
  return Object.keys(dataSources).map(col => {
    return { Header: col, id: col, accessor: (row) => row[col], headerClassName: "table-header" };
  })
}

const getCleanData = queryData => {
  return queryData ? cleanseData(queryData) : queryData
}

export default QueryView;
