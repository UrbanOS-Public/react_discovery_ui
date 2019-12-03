import { takeEvery, put, call, select } from 'redux-saga/effects'
import { EXECUTE_FREESTYLE_QUERY, CANCEL_FREESTYLE_QUERY, setQuerySuccess, setQueryFailure, setQueryInProgress } from '../actions'
import { getDatasetQueryCancelToken } from '../selectors'
import { AuthenticatedHTTPClient } from '../../utils/http-clients'
import { getFreestyleQueryText } from '../query-selectors'

const cancelMessage = 'Your query has been stopped'
const failureMessage = 'Query failure.  There may be a syntax issue.'

function* executeQuery({ queryText }) {
  const cancelToken = AuthenticatedHTTPClient.cancelTokenSource()

  let queryBody
  if (queryText) {
    queryBody = queryText
  } else {
    queryBody = yield select(getFreestyleQueryText)
  }

  yield put(setQueryInProgress(cancelToken))
  try {
    const response = yield call(
      AuthenticatedHTTPClient.post,
      '/api/v1/query',
      queryBody,
      {
        cancelToken: cancelToken.token,
        baseURL: window.API_HOST,
        withCredentials: true,
        headers: { "Content-Type": "text/plain" },
        validateStatus: false
      }
    )

    if (response.status < 400) {
      yield put(setQuerySuccess(response.data))
    } else {
      yield put(setQueryFailure(failureMessage))
    }
  } catch (e) {
    const catchMessage = (e.message === cancelMessage) ? cancelMessage : failureMessage
    yield put(setQueryFailure(catchMessage))
  }
}

const cancelQuery = function* () {
  const cancelToken = yield select(getDatasetQueryCancelToken)
  return cancelToken.cancel(cancelMessage)
}

export default function* freestyleQuerySaga() {
  yield takeEvery(EXECUTE_FREESTYLE_QUERY, executeQuery)
  yield takeEvery(CANCEL_FREESTYLE_QUERY, cancelQuery)
}
