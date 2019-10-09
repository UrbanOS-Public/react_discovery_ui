import { createSelector } from 'reselect'

export const getDataSetList = state => state.datasetReducer.datasets
export const getFacetList = state => state.datasetReducer.facets
export const getTotalNumberOfDatasets = state => state.datasetReducer.total
export const getDataSetError = state => state.datasetReducer.datasetError
export const getDataSet = state => state.datasetReducer.dataset
export const getDataSetPreview = state => state.presentation.dataset_preview
export const determineIfLoading = state => state.presentation.isLoading
export const determineIfVisualizationQueryLoading = state => state.queryReducer.isVisualizationQueryLoading
export const lastLoginAttemptFailed = state => state.presentation.lastLoginAttemptFailed
export const lastLogoutAttemptFailed = state => state.presentation.lastLogoutAttemptFailed
export const getDownloadedDataset = state => state.datasetReducer.downloadedDataset
export const getDownloadedDatasetError = state => state.datasetReducer.downloadedDatasetError
export const getDatasetQueryResult = state => state.queryReducer.datasetQueryResult
export const getFreestyleQueryText = state => state.queryReducer.freestyleQueryText
export const getDatasetQueryCancelToken = state => state.queryReducer.cancelToken
export const selectVisualizationStruct = state => state.visualizationReducer.visualization
export const selectVisualizationLoading = state => state.visualizationReducer.visualizationLoading
export const selectVisualizationFailureMessage = state => state.visualizationReducer.visualizationFailureMessage

export const selectVisualization = createSelector(selectVisualizationStruct, selectVisualizationLoading, getFreestyleQueryText, selectVisualizationFailureMessage, (visualization, loading, locallyEditedQuery, error) => {
  return Object.assign(
    {},
    visualization,
    {
      loading,
      error,
      query: locallyEditedQuery || visualization.query
    }
  )
})

export const getVisualizationDataSources = createSelector(getDatasetQueryResult, data => {
  var dataSources = {}
  if (data && data.length > 0) {
    Object.keys(data[0]).forEach(key => {
      dataSources[key] = data.map(datum => datum[key])
    })
  }
  return dataSources
})
