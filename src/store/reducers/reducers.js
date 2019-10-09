import {
  combineReducers
} from 'redux'
import {
  SELECT_DATA_LIST,
  DISPLAY_ERROR,
  DATASET_DETAILS,
  RETRIEVE_DATA_LIST,
  RETRIEVE_DATASET,
  RETRIEVE_DATASET_PREVIEW,
  DATASET_PREVIEW,
  CLEAR_DATASET_PREVIEW,
  CLEAR_DATASET_DETAILS,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  DOWNLOAD_DATASET_SUCCEEDED,
  DOWNLOAD_DATASET_FAILED,
  QUERY_DATASET_SUCCEEDED,
  QUERY_DATASET,
  QUERY_DATASET_FAILED,
  QUERY_DATASET_IN_PROGRESS,
  QUERY_DATASET_CANCELLED,
  FREESTYLE_QUERY_DATASET,
  CREATE_VISUALIZATION,
  GET_VISUALIZATION,
  VISUALIZATION_AVAILABLE,
  VISUALIZATION_UNAVAILABLE,
  RESET_VISUALIZATION
} from '../actions'

const defaultDatasetState = {
  datasets: [],
  total: 0,
  datasetError: false
}

const datasetReducer = (state = defaultDatasetState, action) => {
  switch (action.type) {
    case SELECT_DATA_LIST:
      return Object.assign({}, state, {
        datasets: action.value.results,
        facets: action.value.metadata.facets,
        total: action.value.metadata.totalDatasets
      })
    case DISPLAY_ERROR:
      return Object.assign({}, state, {
        datasetError: true
      })
    case DATASET_DETAILS:
      return Object.assign({}, state, {
        dataset: action.value
      })
    case CLEAR_DATASET_DETAILS:
      return Object.assign({}, state, {
        dataset: undefined,
        downloadedDataset: undefined
      })
    case DOWNLOAD_DATASET_SUCCEEDED:
      return Object.assign({}, state, {
        downloadedDataset: action.value
      })
    case DOWNLOAD_DATASET_FAILED:
      return Object.assign({}, state, { downloadedDatasetError: true })
    default:
      return state
  }
}

const defaultPresentationState = {
  isLoading: false,
  isVisualizationQueryLoading: false
}

const presentationReducer = (state = defaultPresentationState, action) => {
  switch (action.type) {
    case RETRIEVE_DATA_LIST:
    case RETRIEVE_DATASET:
      return Object.assign({}, state, {
        isVisualizationQueryLoading: true
      })
    case RETRIEVE_DATASET_PREVIEW:
      return Object.assign({}, state, {
        previewLoading: true
      })
    case DATASET_PREVIEW:
      return Object.assign({}, state, {
        dataset_preview: action.value,
        previewLoading: false
      })
    case CLEAR_DATASET_PREVIEW:
      return Object.assign({}, state, {
        dataset_preview: undefined,
        previewLoading: false
      })
    case SELECT_DATA_LIST:
      return Object.assign({}, state, { isVisualizationQueryLoading: false, queryFailureMessage: '' })
    case SELECT_DATA_LIST:
    case DATASET_DETAILS:
      return Object.assign({}, state, {
        isLoading: false
      })
    case LOGIN:
      return Object.assign({}, state, {
        isLoading: true
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        lastLoginAttemptFailed: false,
        isLoading: false
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, { lastLoginAttemptFailed: true, isLoading: false })


    default:
      return state
  }
}

const defaultQueryState = {
  isVisualizationQueryLoading: false,
  queryFailureMessage: '',
  freestyleQueryText: ''
}
const queryReducer = (state = defaultQueryState, action) => {
  switch (action.type) {
    case FREESTYLE_QUERY_DATASET:
      return Object.assign({}, state, {
        freestyleQueryText: action.value.queryText,
        isVisualizationQueryLoading: true
      })
    case QUERY_DATASET:
      return Object.assign({}, state, {
        isVisualizationQueryLoading: true
      })
    case QUERY_DATASET_SUCCEEDED:
      return Object.assign({}, state, { isVisualizationQueryLoading: false, queryFailureMessage: '', datasetQueryResult: action.value })
    case QUERY_DATASET_FAILED:
      return Object.assign({}, state, { queryFailureMessage: action.value.message, isVisualizationQueryLoading: false })
    case QUERY_DATASET_IN_PROGRESS:
      return Object.assign({}, state, { cancelToken: action.value })
    case QUERY_DATASET_CANCELLED:
      return Object.assign({}, state, {
        queryFailureMessage: 'Query Stopped By User', isVisualizationQueryLoading: false
      })
    default: return state
  }
}

const defaultVisualizationState = {
  visualization: {},
  visualizationErrorMessage: '',
  visualizationLoading: false
}
const visualizationReducer = (state = defaultVisualizationState, action) => {
  switch (action.type) {
    case GET_VISUALIZATION:
    case CREATE_VISUALIZATION:
      return Object.assign({}, state, {
        visualizationLoading: true,
        visualizationErrorMessage: ''
      })
    case VISUALIZATION_AVAILABLE:
      return Object.assign({}, state, {
        visualizationLoading: false,
        visualization: action.value
      })
    case VISUALIZATION_UNAVAILABLE:
      return Object.assign({}, state, {
        visualizationLoading: false,
        visualizationErrorMessage: action.value
      })
    case RESET_VISUALIZATION:
      return defaultVisualizationState
    default: return state
  }
}

const reducers = {
  datasetReducer: datasetReducer,
  presentation: presentationReducer,
  queryReducer: queryReducer,
  visualizationReducer: visualizationReducer
}

const combined = combineReducers(reducers)
export {
  combined as
    default, reducers
}
