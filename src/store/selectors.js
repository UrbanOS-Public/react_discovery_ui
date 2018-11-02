export const getDataSetList = state => state.datasetReducer.datasets
export const getTotalNumberOfDatasets = state => state.datasetReducer.total
export const getDataSetError = state => state.datasetReducer.datasetError
export const getDataSet = state => state.datasetReducer.dataset
export const determineIfLoading = state => state.presentation.isLoading
