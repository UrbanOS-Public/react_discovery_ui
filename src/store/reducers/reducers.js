import { combineReducers } from 'redux'
import { SELECT_DATA_LIST, DISPLAY_ERROR, DATASET_DETAILS, RETRIEVE_DATA_LIST, RETRIEVE_DATASET } from '../actions'

const defaultDatasetState = {
  datasets: [],
  total: 0,
  datasetError: false
}

const datasetReducer = (state = defaultDatasetState, action) => {
  switch (action.type) {
    case SELECT_DATA_LIST:
      return Object.assign({}, state, { datasets: action.value.results, total: action.value.metadata.totalDatasets })
    case DISPLAY_ERROR:
      return Object.assign({}, state, { datasetError: true })
    case DATASET_DETAILS:
      return Object.assign({}, state, { dataset: action.value })
    default:
      return state
  }
}

const presentationReducer = (state = { isLoading: false }, action) => {
  switch (action.type) {
    case RETRIEVE_DATA_LIST:
    case RETRIEVE_DATASET:
      return Object.assign({}, state, { isLoading: true })
    case SELECT_DATA_LIST:
    case DATASET_DETAILS:
      return Object.assign({}, state, { isLoading: false })
    default:
      return state
  }
}

export default combineReducers({
  datasetReducer: datasetReducer,
  presentation: presentationReducer
})
