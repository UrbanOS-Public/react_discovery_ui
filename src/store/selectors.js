export const getDataSetList = state => state.datasetReducer.datasets;
export const getFacetList = state => state.datasetReducer.facets;
export const getTotalNumberOfDatasets = state => state.datasetReducer.total;
export const getDataSetError = state => state.datasetReducer.datasetError;
export const getDataSet = state => state.datasetReducer.dataset;
export const getDataSetPreview = state => state.presentation.dataset_preview;
export const getDatasetRecommendations = state =>
  state.datasetReducer.recommendations;
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
export const getDatasetQueryCancelToken = state =>
  state.queryReducer.cancelToken;
export const getSearchParams = state => state.searchReducer.searchParams;
export const getSearchResults = state => state.searchReducer.searchResults;
export const getSearchMetadata = state =>
  state.searchReducer.searchMetadata || [];
export const getPageNumber = state =>
  calculatePageNumber(state.searchReducer.searchParams);
export const getNumberOfPages = state =>
  Math.ceil(
    state.searchReducer.searchMetadata.totalDatasets /
      state.searchReducer.searchMetadata.limit
  );
export const isSearchLoading = state => state.searchReducer.isRunning;

function calculatePageNumber({ offset, limit }) {
  return Math.ceil(offset / limit) + 1;
}
