import { createSelector } from 'reselect'

export const getDataSetList = state => state.datasetReducer.datasets
export const getFacetList = state => state.datasetReducer.facets
export const getTotalNumberOfDatasets = state => state.datasetReducer.total
export const getDataSetError = state => state.datasetReducer.datasetError
export const getDataSet = state => state.datasetReducer.dataset
export const getDataSetPreview = state => state.presentation.dataset_preview
export const determineIfLoading = state => state.presentation.isLoading
export const lastLoginAttemptFailed = state => state.presentation.lastLoginAttemptFailed
export const lastLogoutAttemptFailed = state => state.presentation.lastLogoutAttemptFailed
export const getDownloadedDataset = state => state.datasetReducer.downloadedDataset
export const getDatasetQueryResult = state => state.datasetReducer.datasetQueryResult

// TODO: TEST ME
export const getVisualizationDataSources = createSelector(getDatasetQueryResult, data => {
  var dataSources = {};

  if (data && data.length > 0) {
    Object.keys(data[0]).forEach(key => {
      dataSources[key] = data.map(datum => {
        return datum[key];
      });
    });
  }
  return dataSources
})
