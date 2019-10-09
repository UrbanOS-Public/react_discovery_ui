import { SET_QUERY_TEXT, CLEAR_QUERY_TEXT, SET_QUERY_SUCCESS, SET_QUERY_FAILURE, SET_QUERY_IN_PROGRESS } from "../actions"

const defaultQueryState = {
  queryText: "",
  queryData: {},
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
        queryData: {},
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

    default:
      return state
  }
}