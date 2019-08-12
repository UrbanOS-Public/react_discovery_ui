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
export const LOGOUT = 'LOGOUT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
export const DOWNLOAD_DATASET = 'DOWNLOAD_DATASET'
export const DOWNLOAD_DATASET_SUCCEEDED = 'DOWNLOAD_DATASET_SUCCEEDED'
export const DOWNLOAD_DATASET_FAILED = 'DOWNLOAD_DATASET_FAILED'
export const QUERY_DATASET = 'QUERY_DATASET'
export const QUERY_DATASET_SUCCEEDED = 'QUERY_DATASET_SUCCEEDED'

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
  type: RETRIEVE_DATASET, value: { organization_name: org_name, dataset_name: dataset_name }
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

export const logout = (credentials) => ({
  type: LOGOUT, value: credentials
})

export const logoutSuccess = (message) => ({
  type: LOGOUT_SUCCESS, value: message
})

export const logoutFailure = (message) => ({
  type: LOGOUT_FAILURE, value: message
})

export const downloadDataset = (datasetId, format) => ({
  type: DOWNLOAD_DATASET, value: { datasetId: datasetId, format: format }
})

export const downloadDatasetSucceeded = (message) => ({
  type: DOWNLOAD_DATASET_SUCCEEDED, value: message
})

export const downloadDatasetFailed = (message) => ({
  type: DOWNLOAD_DATASET_FAILED, value: message
})

export const queryDataset = (organizationName, datasetName, format, limit) => ({
  type: QUERY_DATASET, organizationName, datasetName, format, limit
})

export const queryDatasetSucceeded = (message) => ({
  type: QUERY_DATASET_SUCCEEDED, value: message
})
