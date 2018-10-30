export const RETRIEVE_DATA_LIST = 'RETRIEVE_DATA_LIST'
export const SELECT_DATA_LIST = 'SELECT_DATA_LIST'
export const DISPLAY_ERROR = 'DISPLAY_ERROR'
export const RETRIEVE_DATASET = 'RETRIEVE_DATASET'
export const DATASET_DETAILS = 'DATASET_DETAILS'

export const retrieveDataList = (offset, limit) => ({
  type: RETRIEVE_DATA_LIST,
  value: {
    offset: offset,
    limit: limit
  }
})

export const selectDataList = (data) => ({
  type: SELECT_DATA_LIST, value: data
})

export const displayError = () => ({
  type: DISPLAY_ERROR
})

export const retrieveDatasetDetails = id => ({
  type: RETRIEVE_DATASET, value: id
})

export const datasetDetails = (data) => ({
  type: DATASET_DETAILS, value: data
})
