import { takeEvery, put, call, select } from 'redux-saga/effects'
import { FREESTYLE_QUERY_DATASET, QUERY_DATASET_CANCELLED, queryDatasetSucceeded, queryDatasetFailed, queryDatasetInProgress } from '../actions'
import { getDatasetQueryCancelToken } from '../selectors'
import axios from 'axios'

function* freestyleQuery({ value: { queryText } }) {
  const CancelToken = axios.CancelToken
  const source = CancelToken.source()
  yield put(queryDatasetInProgress(source))
  try {
    const response = yield call(
      axios.post,
      '/api/v1/query',
      queryText,
      {
        cancelToken: source.token,
        baseURL: window.API_HOST,
        withCredentials: true,
        headers: { "Content-Type": "text/plain" },
        validateStatus: false
      }
    )

    if (response.status === 200) {
      yield put(queryDatasetSucceeded(response.data))
    } else {
      yield put(queryDatasetFailed(response.data.message))
    }
  } catch (e) {
    yield put(queryDatasetFailed(e.message))
  }
}

const cancelQuery = function* (_action) {
  const cancelToken = yield select(getDatasetQueryCancelToken)
  return cancelToken.cancel('Query stopped by user')
}

export default function* freestyleQuerySaga() {
  yield takeEvery(FREESTYLE_QUERY_DATASET, freestyleQuery)
  yield takeEvery(QUERY_DATASET_CANCELLED, cancelQuery)
}
