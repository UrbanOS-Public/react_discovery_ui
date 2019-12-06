import { SET_QUERY_TEXT, CLEAR_QUERY_TEXT, SET_QUERY_SUCCESS, SET_QUERY_FAILURE, SET_QUERY_IN_PROGRESS, RESET_QUERY, SET_USER_INTERACTED } from "../actions"

const defaultQueryState = {
  queryText: "",
  queryData: null,
  queryFailureMessage: "",
  isQueryLoading: false,
  userInteracted: false,
  cancelToken: null,
  queryHasBeenExecuted: false
}

export default (state = defaultQueryState, action) => {
  switch (action.type) {
    case SET_QUERY_TEXT:
      return Object.assign({}, state, {
        queryText: action.queryText,
      })
    case CLEAR_QUERY_TEXT:
      return Object.assign({}, state, {
        queryText: "",
      })
    case SET_QUERY_SUCCESS:
      return Object.assign({}, state, {
        queryData: action.queryData,
        queryFailureMessage: "",
        isQueryLoading: false,
        cancelToken: null
      })
    case SET_QUERY_FAILURE:
      return Object.assign({}, state, {
        queryFailureMessage: action.failureMessage,
        isQueryLoading: false,
        cancelToken: null
      })
    case SET_QUERY_IN_PROGRESS:
      return Object.assign({}, state, {
        isQueryLoading: true,
        cancelToken: action.cancelToken,
        queryHasBeenExecuted: true
      })
    case SET_USER_INTERACTED:
      return Object.assign({}, state, {
        userInteracted: true
      })
    case RESET_QUERY:
      return defaultQueryState

    default:
      return state
  }
}
