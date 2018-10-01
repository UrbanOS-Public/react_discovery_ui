import { combineReducers } from 'redux'
import { ADD_TO_COUNT, SUBTRACT_FROM_COUNT } from '../actions'

const DEFAULT_STATE = { count: 0 }

const countingReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_TO_COUNT:
      return Object.assign({}, state, { count: state.count + action.value })
    case SUBTRACT_FROM_COUNT:
      return Object.assign({}, state, { count: state.count - action.value })
    default:
      return state
  }
}

export default combineReducers({
  counting: countingReducer
})
