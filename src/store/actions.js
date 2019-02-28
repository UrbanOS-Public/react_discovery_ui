export const RETRIEVE_DATA_LIST = 'RETRIEVE_DATA_LIST'
export const SELECT_DATA_LIST = 'SELECT_DATA_LIST'
export const DISPLAY_ERROR = 'DISPLAY_ERROR'
export const RETRIEVE_DATASET = 'RETRIEVE_DATASET'
export const DATASET_DETAILS = 'DATASET_DETAILS'
export const RETRIEVE_DATASET_PREVIEW = 'RETRIEVE_DATASET_PREVIEW'
export const DATASET_PREVIEW = 'DATASET_PREVIEW'
export const CLEAR_DATASET_DETAILS = 'CLEAR_DATASET_DETAILS'

export const retrieveDataList = (offset, limit, sort, query, facets) => ({
  type: RETRIEVE_DATA_LIST,
  value: {
    offset: offset,
    limit: limit,
    sort: sort,
    query: query,
    facets: facets
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

export const retrieveDatasetPreview = id => ({
  type: RETRIEVE_DATASET_PREVIEW, value: id
})

export const datasetPreview = (data) => ({
  type: DATASET_PREVIEW, value: data
})

export const clearDatasetDetails = () => ({
  type: CLEAR_DATASET_DETAILS
})
