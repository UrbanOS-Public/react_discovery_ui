import { takeEvery, put, call, select } from 'redux-saga/effects'
import { EXECUTE_FREESTYLE_QUERY, CANCEL_FREESTYLE_QUERY, setQuerySuccess, setQueryFailure, setQueryInProgress } from '../actions'
import { getDatasetQueryCancelToken } from '../selectors'
import axios from 'axios'

function* executeQuery({ queryText }) {
  const cancelToken = axios.CancelToken.source()
  yield put(setQueryInProgress(cancelToken))
  try {
    const response = yield call(
      axios.post,
      '/api/v1/query',
      queryText,
      {
        cancelToken,
        baseURL: window.API_HOST,
        withCredentials: true,
        headers: { "Content-Type": "text/plain" },
        validateStatus: false
      }
    )

    if (response.status === 200) {
      yield put(setQuerySuccess(response.data))
    } else {
      yield put(setQueryFailure(response.data.message))
    }
  } catch (e) {
    yield put(setQueryFailure(e.message))
  }
}

const cancelQuery = function* (_action) {
  const cancelToken = yield select(getDatasetQueryCancelToken)
  return cancelToken.cancel('Query stopped by user')
}

export default function* freestyleQuerySaga() {
  yield takeEvery(EXECUTE_FREESTYLE_QUERY, executeQuery)
  yield takeEvery(CANCEL_FREESTYLE_QUERY, cancelQuery)
}
