import {
  VISUALIZATION_CREATE,
  VISUALIZATION_FETCH,
  VISUALIZATION_FETCH_SUCCESS,
  VISUALIZATION_FETCH_FAILURE,
  VISUALIZATION_RESET,
  VISUALIZATION_CREATE_SUCCESS,
  VISUALIZATION_CREATE_FAILURE,
  VISUALIZATION_CREATE_FINISH
} from "../actions"

const defaultVisualizationState = {
  visualization: {},
  loadError: false,
  saveError: false,
  loading: false,
  loaded: false,
  saving: false,
  saved: false
}

const visualizationReducer = (state = defaultVisualizationState, action) => {
  switch (action.type) {
    case VISUALIZATION_FETCH:
      return Object.assign({}, state, {
        loading: true,
        loaded: false
      })
    case VISUALIZATION_FETCH_SUCCESS:
      return Object.assign({}, state, {
        loadError: false,
        loading: false,
        loaded: true,
        visualization: action.value
      })
    case VISUALIZATION_FETCH_FAILURE:
      return Object.assign({}, state, {
        loaded: false,
        loading: false,
        loadError: true 
      })
    case VISUALIZATION_CREATE:
      return Object.assign({}, state, {
        saving: true,
        saved: false
      })
    case VISUALIZATION_CREATE_SUCCESS:
      return Object.assign({}, state, {
        saveError: false,
        saved: true,
        visualization: action.value
      })
    case VISUALIZATION_CREATE_FAILURE:
      return Object.assign({}, state, {
        saved: false,
        saveError: true
      })
    case VISUALIZATION_CREATE_FINISH:
      return Object.assign({}, state, {
        saved: false,
        saveError: false,
        saving: false
      })
    case VISUALIZATION_RESET:
      return defaultVisualizationState
    default: return state
  }
}

export default visualizationReducer