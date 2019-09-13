import { takeEvery, put, call } from 'redux-saga/effects'
import { FREESTYLE_QUERY_DATASET, queryDatasetSucceeded, queryDatasetFailed } from '../actions'
import axios from 'axios'

function* freestyleQuery({ value: { queryText } }) {
  try {
    const response = yield call(
      axios.post,
      '/api/v1/query',
      queryText,
      {
        baseURL: window.API_HOST,
        withCredentials: true,
        headers: { "Content-Type": "text/plain" },
        validateStatus: false
      }
    )

    if (response.status === 200) {
      yield put(queryDatasetSucceeded(response.data))
    } else {
      yield put(queryDatasetFailed(response.data))
    }
  } catch (e) {
    yield put(queryDatasetFailed(e.message))
  }
}

export default function* freestyleQuerySaga() {
  yield takeEvery(FREESTYLE_QUERY_DATASET, freestyleQuery)
}
