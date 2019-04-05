import { combineReducers } from 'redux'
import { SELECT_DATA_LIST, DISPLAY_ERROR, DATASET_DETAILS, RETRIEVE_DATA_LIST, RETRIEVE_DATASET, RETRIEVE_DATASET_PREVIEW, DATASET_PREVIEW, CLEAR_DATASET_DETAILS, LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions'

const defaultDatasetState = {
  datasets: [],
  total: 0,
  datasetError: false
}

const datasetReducer = (state = defaultDatasetState, action) => {
  switch (action.type) {
    case SELECT_DATA_LIST:
      return Object.assign({}, state, { datasets: action.value.results, facets: action.value.metadata.facets, total: action.value.metadata.totalDatasets })
    case DISPLAY_ERROR:
      return Object.assign({}, state, { datasetError: true })
    case DATASET_DETAILS:
      return Object.assign({}, state, { dataset: action.value })
    case CLEAR_DATASET_DETAILS:
      return Object.assign({}, state, { dataset: undefined })
    default:
      return state
  }
}

const presentationReducer = (state = { isLoading: false }, action) => {
  switch (action.type) {
    case RETRIEVE_DATA_LIST:
    case RETRIEVE_DATASET:
      return Object.assign({}, state, { isLoading: true })
    case RETRIEVE_DATASET_PREVIEW:
      return Object.assign({}, state, { isLoading: true })
    case DATASET_PREVIEW:
      return Object.assign({}, state, { dataset_preview: action.value, isLoading: false })
    case SELECT_DATA_LIST:
    case DATASET_DETAILS:
      return Object.assign({}, state, { isLoading: false })
    case LOGIN:
      return Object.assign({}, state, { isLoading: true })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { lastLoginAttemptFailed: false })
    case LOGIN_FAILURE:
      return Object.assign({}, state, { lastLoginAttemptFailed: true, isLoading: false })
    default:
      return state
  }
}

export default combineReducers({
  datasetReducer: datasetReducer,
  presentation: presentationReducer
})
