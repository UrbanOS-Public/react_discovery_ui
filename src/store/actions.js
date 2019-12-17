export const RETRIEVE_DATA_LIST = 'RETRIEVE_DATA_LIST'
export const DISPLAY_ERROR = 'DISPLAY_ERROR'
export const RETRIEVE_DATASET = 'RETRIEVE_DATASET'
export const DATASET_DETAILS = 'DATASET_DETAILS'
export const RETRIEVE_DATASET_PREVIEW = 'RETRIEVE_DATASET_PREVIEW'
export const DATASET_PREVIEW = 'DATASET_PREVIEW'
export const DATASET_RECOMMENDATIONS = 'DATASET_RECOMMENDATIONS'
export const DATASET_RECOMMENDATIONS_SUCCEEDED = 'DATASET_RECOMMENDATIONS_SUCCEEDED'
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
export const FREESTYLE_QUERY_UPDATE = 'FREESTYLE_QUERY_UPDATE'
export const QUERY_DATASET_IN_PROGRESS = 'QUERY_DATASET_IN_PROGRESS'
export const QUERY_DATASET_CANCELLED = 'QUERY_DATASET_CANCELLED'

//-- Freestyle Query Actions ----------------------------------
export const EXECUTE_FREESTYLE_QUERY = 'EXECUTE_FREESTYLE_QUERY'
export const executeFreestyleQuery = queryText => ({ type: EXECUTE_FREESTYLE_QUERY, queryText })

export const CANCEL_FREESTYLE_QUERY = 'CANCEL_FREESTYLE_QUERY'
export const cancelFreestyleQuery = () => ({ type: CANCEL_FREESTYLE_QUERY })

export const SET_QUERY_TEXT = 'SET_QUERY_TEXT'
export const setQueryText = queryText => ({
  type: SET_QUERY_TEXT,
  queryText
})

export const CLEAR_QUERY_TEXT = 'CLEAR_QUERY_TEXT'
export const clearQueryText = () => ({ type: CLEAR_QUERY_TEXT })

export const SET_QUERY_SUCCESS = 'SET_QUERY_SUCCESS'
export const setQuerySuccess = queryData => ({
  type: SET_QUERY_SUCCESS,
  queryData
})

export const SET_QUERY_FAILURE = 'SET_QUERY_FAILURE'
export const setQueryFailure = failureMessage => ({
  type: SET_QUERY_FAILURE,
  failureMessage
})

export const SET_QUERY_IN_PROGRESS = 'SET_QUERY_IN_PROGRESS'
export const setQueryInProgress = cancelToken => ({ type: SET_QUERY_IN_PROGRESS, cancelToken })

export const RESET_QUERY = 'RESET_QUERY'
export const resetQuery = () => ({ type: RESET_QUERY })

//-------------------------------------------------------------

export const displayError = () => ({
  type: DISPLAY_ERROR
})

export const retrieveDatasetDetails = (org_name, dataset_name) => ({
  type: RETRIEVE_DATASET, value: { organization_name: org_name, dataset_name: dataset_name }
})

export const datasetDetails = (data) => ({
  type: DATASET_DETAILS, value: data
})

export const datasetRecommendations = (datasetId) => ({
  type: DATASET_RECOMMENDATIONS, value: datasetId
})

export const datasetRecommendationsSucceeded = (message) => ({
  type: DATASET_RECOMMENDATIONS_SUCCEEDED, value: message
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

export const VISUALIZATIONS_LOAD_ALL = 'VISUALIZATIONS_LOAD_ALL'
export const visualizationsLoadAll = () => ({
  type: VISUALIZATIONS_LOAD_ALL
})

export const VISUALIZATIONS_LOAD_ALL_SUCCESS = 'VISUALIZATIONS_LOAD_ALL_SUCCESS'
export const visualizationsLoadAllSuccess = (userVisualizations) => ({
  type: VISUALIZATIONS_LOAD_ALL_SUCCESS, value: userVisualizations
})

export const VISUALIZATIONS_LOAD_ALL_FAILURE = 'VISUALIZATIONS_LOAD_ALL_FAILURE'
export const visualizationsLoadAllFailure = () => ({
  type: VISUALIZATIONS_LOAD_ALL_FAILURE
})

export const VISUALIZATION_LOAD_SUCCESS = 'VISUALIZATION_LOAD_SUCCESS'
export const visualizationLoadSuccess = (visualization) => ({
  type: VISUALIZATION_LOAD_SUCCESS, value: visualization
})

export const VISUALIZATION_LOAD = 'VISUALIZATION_LOAD'
export const visualizationLoad = (id) => ({
  type: VISUALIZATION_LOAD, value: id
})

export const VISUALIZATION_LOAD_FAILURE = 'VISUALIZATION_LOAD_FAILURE'
export const visualizationLoadFailure = (errorMessage) => ({
  type: VISUALIZATION_LOAD_FAILURE, value: errorMessage
})

export const VISUALIZATION_SAVE = 'VISUALIZATION_SAVE'
export const visualizationSave = ({ id, title, query }) => ({
  type: VISUALIZATION_SAVE, value: { id, title, query }
})

export const VISUALIZATION_SAVE_SUCCESS = 'VISUALIZATION_SAVE_SUCCESS'
export const visualizationSaveSuccess = (visualization) => ({
  type: VISUALIZATION_SAVE_SUCCESS, value: visualization
})

export const VISUALIZATION_SAVE_FAILURE = 'VISUALIZATION_SAVE_FAILURE'
export const visualizationSaveFailure = (errorMessage) => ({
  type: VISUALIZATION_SAVE_FAILURE, value: errorMessage
})

export const SET_CHART_INFORMATION = 'SET_CHART_INFORMATION'
export const setChartInformation = (chart) => ({
  type: SET_CHART_INFORMATION, value: chart
})

export const VISUALIZATION_RESET = 'VISUALIZATION_RESET'
export const visualizationReset = () => ({
  type: VISUALIZATION_RESET
})

export const DATASET_SEARCH = "DATASET_SEARCH"
export const datasetSearch = (params) => ({
  type: DATASET_SEARCH, value: params
})

export const DATASET_SEARCH_SUCCEEDED = 'DATASET_SEARCH_SUCCEEDED'
export const datasetSearchSucceeded = (data) => ({
  type: DATASET_SEARCH_SUCCEEDED, value: data
})

export const OAUTH_LOGGED_IN = "OAUTH_LOGGED_IN"
export const oAuthCallLoggedIn = () => ({
  type: OAUTH_LOGGED_IN
})
