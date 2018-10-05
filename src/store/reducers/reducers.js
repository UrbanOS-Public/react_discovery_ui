import { combineReducers } from 'redux'
import { SELECT_DATA_LIST, DISPLAY_ERROR } from '../actions'

const defaultDatasetState = {
  datasets: [],
  datasetError: false
}

const datasetReducer = (state = defaultDatasetState, action) => {
  switch (action.type) {
    case SELECT_DATA_LIST:
      return Object.assign({}, state, { datasets: action.value })
    case DISPLAY_ERROR:
      return Object.assign({}, state, { datasetError: true })
    default:
      return state
  }
}

export default combineReducers({
  datasetReducer
})
