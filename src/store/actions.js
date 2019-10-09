export const RETRIEVE_DATA_LIST = 'RETRIEVE_DATA_LIST'
export const SELECT_DATA_LIST = 'SELECT_DATA_LIST'
export const DISPLAY_ERROR = 'DISPLAY_ERROR'
export const RETRIEVE_DATASET = 'RETRIEVE_DATASET'
export const DATASET_DETAILS = 'DATASET_DETAILS'
export const RETRIEVE_DATASET_PREVIEW = 'RETRIEVE_DATASET_PREVIEW'
export const DATASET_PREVIEW = 'DATASET_PREVIEW'
export const CLEAR_DATASET_PREVIEW = 'CLEAR_DATASET_PREVIEW'
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
export const QUERY_DATASET_FAILED = 'QUERY_DATASET_FAILED'
export const FREESTYLE_QUERY_DATASET = 'FREESTYLE_QUERY_DATASET'
export const QUERY_DATASET_IN_PROGRESS = 'QUERY_DATASET_IN_PROGRESS'
export const QUERY_DATASET_CANCELLED = 'QUERY_DATASET_CANCELLED'

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

export const retrieveDatasetPreview = (id, format = 'json') => ({
  type: RETRIEVE_DATASET_PREVIEW, value: { id, format }
})

export const datasetPreview = (data) => ({
  type: DATASET_PREVIEW, value: data
})

export const clearDatasetPreview = () => ({
  type: CLEAR_DATASET_PREVIEW
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

export const downloadDataset = (id, format) => ({
  type: DOWNLOAD_DATASET, value: { id, format }
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

export const freestyleQueryDataset = (queryText) => ({
  type: FREESTYLE_QUERY_DATASET, value: { queryText }
})

export const queryDatasetSucceeded = (message) => ({
  type: QUERY_DATASET_SUCCEEDED, value: message
})

export const queryDatasetFailed = (message) => ({
  type: QUERY_DATASET_FAILED, value: message
})

export const queryDatasetInProgress = (message) => ({
  type: QUERY_DATASET_IN_PROGRESS, value: message
})

export const queryDatasetCancelled = (message) => ({
  type: QUERY_DATASET_CANCELLED, value: message
})

export const GET_VISUALIZATION = 'GET_VISUALIZATION'
export const getVisualization = (id) => ({
  type: GET_VISUALIZATION, value: id
})

export const CREATE_VISUALIZATION = 'CREATE_VISUALIZATION'
export const createVisualization = (title, query) => ({
  type: CREATE_VISUALIZATION, value: {title, query}
})

export const VISUALIZATION_AVAILABLE = 'VISUALIZATION_AVAILABLE'
export const visualizationAvailable = (visualization) => ({
  type: VISUALIZATION_AVAILABLE, value: visualization
})

export const VISUALIZATION_UNAVAILABLE = 'VISUALIZATION_UNAVAILABLE'
export const visualizationUnavailable = (errorMessage) => ({
  type: VISUALIZATION_UNAVAILABLE, value: errorMessage
})

export const RESET_VISUALIZATION = 'RESET_VISUALIZATION'
export const resetVisualization = () => ({
  type: RESET_VISUALIZATION
})
