import { createSelector } from "reselect";

export const getDataSetList = state => state.datasetReducer.datasets;
export const getFacetList = state => state.datasetReducer.facets;
export const getTotalNumberOfDatasets = state => state.datasetReducer.total;
export const getDataSetError = state => state.datasetReducer.datasetError;
export const getDataset = state => state.datasetReducer.dataset;
export const getDataSetPreview = state => state.presentation.dataset_preview;
export const determineIfLoading = state => state.presentation.isLoading;
export const determineIfVisualizationQueryLoading = state =>
  state.queryReducer.isVisualizationQueryLoading;
export const lastLoginAttemptFailed = state =>
  state.presentation.lastLoginAttemptFailed;
export const lastLogoutAttemptFailed = state =>
  state.presentation.lastLogoutAttemptFailed;
export const getDownloadedDataset = state =>
  state.datasetReducer.downloadedDataset;
export const getDownloadedDatasetError = state =>
  state.datasetReducer.downloadedDatasetError;
export const getDatasetQueryResult = state =>
  state.queryReducer.queryData;
export const getDatasetQueryCancelToken = state =>
  state.queryReducer.cancelToken;

export const selectVisualizationStruct = state => state.visualization.visualization
export const selectVisualizationLoading = state => state.visualization.loading
export const selectVisualizationFailureMessage = state => state.visualization.error

export const selectVisualization = createSelector(selectVisualizationStruct, selectVisualizationLoading, selectVisualizationFailureMessage, (visualization, loading, error) => {
  return Object.assign(
    {},
    visualization,
    {
      loading,
      error
    }
  )
})
