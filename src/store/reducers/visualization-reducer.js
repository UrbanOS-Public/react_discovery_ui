import {
  CREATE_VISUALIZATION,
  GET_VISUALIZATION,
  VISUALIZATION_AVAILABLE,
  VISUALIZATION_UNAVAILABLE,
  RESET_VISUALIZATION
} from "../actions"

const defaultVisualizationState = {
  visualization: {},
  error: false,
  loading: false
}

const visualizationReducer = (state = defaultVisualizationState, action) => {
  switch (action.type) {
    case GET_VISUALIZATION:
    case CREATE_VISUALIZATION:
      return Object.assign({}, state, {
        loading: true
      })
    case VISUALIZATION_AVAILABLE:
      return Object.assign({}, state, {
        error: false,
        loading: false,
        visualization: action.value
      })
    case VISUALIZATION_UNAVAILABLE:
      return Object.assign({}, state, {
        loading: false,
        error: true
      })
    case RESET_VISUALIZATION:
      return defaultVisualizationState
    default: return state
  }
}

export default visualizationReducer