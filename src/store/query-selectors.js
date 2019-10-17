import { createSelector } from 'reselect'
import { isEmpty } from 'lodash'

export const getQueryFailureMessage = state => state.queryReducer.queryFailureMessage
export const getQueryIsLoading = state => state.queryReducer.isQueryLoading

export const userHasInteracted = state => state.queryReducer.userInteracted

export const getQueryData = state => state.queryReducer.queryData || []
export const isQueryDataAvailable = state => state.queryReducer.queryData !== null
export const isQueryTextAvailable = state => !isEmpty(getFreestyleQueryText(state))

export const shouldAutoFetchQuery = createSelector(
  isQueryDataAvailable, isQueryTextAvailable, getQueryFailureMessage,
  (dataAvailable, textAvailable, failureMessage) => {
    return !dataAvailable && textAvailable && isEmpty(failureMessage)
  }
)

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
  state => state.datasetReducer.dataset,
  (queryText, dataset) => {
    if (queryText) return queryText
    return dataset ? defaultQuery(dataset.systemName) : ''
  }
)
