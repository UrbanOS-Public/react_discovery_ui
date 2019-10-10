import { SET_QUERY_TEXT, CLEAR_QUERY_TEXT, SET_QUERY_SUCCESS, SET_QUERY_FAILURE, SET_QUERY_IN_PROGRESS, RESET_QUERY } from "../actions"

const defaultQueryState = {
  queryText: "",
  queryData: null,
  queryFailureMessage: "",
  isQueryLoading: false,
  isQueryLoaded: false,
  cancelToken: null
}

export default (state = defaultQueryState, action) => {
  switch (action.type) {
    case SET_QUERY_TEXT:
      return Object.assign({}, state, {
        queryText: action.queryText,
        isQueryLoaded: false
      })
    case CLEAR_QUERY_TEXT:
      return Object.assign({}, state, {
        queryText: "",
        isQueryLoaded: false
      })
    case SET_QUERY_SUCCESS:
      return Object.assign({}, state, {
        queryData: action.queryData,
        queryFailureMessage: "",
        isQueryLoaded: true,
        isQueryLoading: false,
        cancelToken: null
      })
    case SET_QUERY_FAILURE:
      return Object.assign({}, state, {
        queryFailureMessage: action.failureMessage,
        isQueryLoaded: true,
        isQueryLoading: false,
        cancelToken: null
      })
    case SET_QUERY_IN_PROGRESS:
      return Object.assign({}, state, {
        isQueryLoading: true,
        cancelToken: action.cancelToken
      })
    case RESET_QUERY:
      return Object.assign({}, state, {
        ...defaultQueryState
      })

    default:
      return state
  }
}