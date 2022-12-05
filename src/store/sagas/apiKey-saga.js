import { takeEvery, put, call, fork, all } from 'redux-saga/effects'
import { AuthenticatedHTTPClient } from '../../utils/http-clients'
import { GENERATE_API_KEY, generateApiKeySucceeded, setGlobalErrorState } from '../actions'

function * generateApiKey () {
  try {
    const response = yield call(() => AuthenticatedHTTPClient.patch('/api/v1/regenerateApiKey', ''))

    yield put(generateApiKeySucceeded(response.data.apiKey))

    if (response.status >= 400) {
      yield put(setGlobalErrorState(true, 'Could not generate api key. Please try again.'))
    }
  } catch (e) {
    yield put(setGlobalErrorState(true, 'Could not generate api key. Please try again.'))
  }
}

function * generateApiKeySaga () {
  yield takeEvery(GENERATE_API_KEY, generateApiKey)
}

export default function * apiKeySaga () {
  yield all([
    fork(generateApiKeySaga)
  ])
}
