import { createSelector } from 'reselect'
import { isEmpty } from 'lodash'
import { getDataSet } from './selectors'

const queryData = state => state.queryReducer.queryData

export const getQueryFailureMessage = state => state.queryReducer.queryFailureMessage
export const getQueryIsLoading = state => state.queryReducer.isQueryLoading

export const userHasInteracted = state => state.queryReducer.userInteracted

export const getQueryData = createSelector(queryData, queryData => queryData || [])
export const isQueryDataAvailable = state => queryData(state) !== null
export const isQueryTextAvailable = state => !isEmpty(getFreestyleQueryText(state))

export const queryHasBeenExecuted = state => state.queryReducer.queryHasBeenExecuted
export const shouldAutoExecuteQuery = createSelector(queryHasBeenExecuted,
  (queryHasBeenExecuted) => !queryHasBeenExecuted
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
  getDataSet,
  (queryText, dataset) => {
    if (queryText) return queryText
    return dataset ? defaultQuery(dataset.systemName) : ''
  }
)
