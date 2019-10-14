import { createSelector } from 'reselect'

export const getQueryFailureMessage = state => state.queryReducer.queryFailureMessage
export const getQueryIsLoading = state => state.queryReducer.isQueryLoading

export const userHasInteracted = state => state.queryReducer.userInteracted

export const getQueryData = state => state.queryReducer.queryData || []
export const isQueryDataSet = state => state.queryReducer.queryData !== null
export const getVisualizationDataSources = createSelector(
  getQueryData,
  data => {
    var dataSources = {};
    if (data && data.length > 0) {
      Object.keys(data[0]).forEach(key => {
        dataSources[key] = data.map(datum => datum[key]);
      });
    }
    return dataSources;
  }
)

const defaultQuery = tablename => `SELECT * FROM ${tablename}\nLIMIT 20000`;
export const getFreestyleQueryText = createSelector(
  state => state.queryReducer.queryText,
  state => state.datasetReducer.dataset.systemName,
  (queryText, tablename) => queryText || defaultQuery(tablename)
)