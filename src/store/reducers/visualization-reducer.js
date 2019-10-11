import {
  VISUALIZATION_CREATE,
  VISUALIZATION_FETCH,
  VISUALIZATION_FETCH_SUCCESS,
  VISUALIZATION_FETCH_FAILURE,
  VISUALIZATION_RESET,
  VISUALIZATION_CREATE_SUCCESS,
  VISUALIZATION_CREATE_FAILURE
} from "../actions"

const defaultVisualizationState = {
  visualization: {},
  error: false,
  loading: false,
  saving: false
}

const visualizationReducer = (state = defaultVisualizationState, action) => {
  switch (action.type) {
    case VISUALIZATION_CREATE:
      return Object.assign({}, state, {
        saving: true
      })
    case VISUALIZATION_FETCH:
      return Object.assign({}, state, {
        loading: true
      })
    case VISUALIZATION_FETCH_SUCCESS:
      return Object.assign({}, state, {
        error: false,
        loading: false,
        visualization: action.value
      })
    case VISUALIZATION_FETCH_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: true
      })
    case VISUALIZATION_CREATE_SUCCESS:
      return Object.assign({}, state, {
        error: false,
        saving: false,
        visualization: action.value
      })
    case VISUALIZATION_CREATE_FAILURE:
      return Object.assign({}, state, {
        saving: false,
        error: true
      })
    case VISUALIZATION_RESET:
      return defaultVisualizationState
    default: return state
  }
}

export default visualizationReducer