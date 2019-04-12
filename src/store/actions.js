export const RETRIEVE_DATA_LIST = 'RETRIEVE_DATA_LIST'
export const SELECT_DATA_LIST = 'SELECT_DATA_LIST'
export const DISPLAY_ERROR = 'DISPLAY_ERROR'
export const RETRIEVE_DATASET = 'RETRIEVE_DATASET'
export const DATASET_DETAILS = 'DATASET_DETAILS'
export const RETRIEVE_DATASET_PREVIEW = 'RETRIEVE_DATASET_PREVIEW'
export const DATASET_PREVIEW = 'DATASET_PREVIEW'
export const CLEAR_DATASET_DETAILS = 'CLEAR_DATASET_DETAILS'
export const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

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

export const retrieveDatasetDetails = (org_name, dataset_name) => ({
  type: RETRIEVE_DATASET, value: {organization_name: org_name, dataset_name: dataset_name}
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

export const login = (credentials) => ({
  type: LOGIN, value: credentials
})

export const loginSuccess = (message) => ({
  type: LOGIN_SUCCESS, value: message
})

export const loginFailure = (message) => ({
  type: LOGIN_FAILURE, value: message
})
