import { takeEvery, put, call, fork, all } from 'redux-saga/effects'
import { AuthenticatedHTTPClient } from '../../utils/http-clients'
import { OAUTH_LOGGED_IN, setGlobalErrorState } from '../actions'

function * callLoggedIn () {
  try {
    const response = yield call(() => AuthenticatedHTTPClient.post('/api/v1/logged-in', ''))

    if (response.status >= 400) {
      yield put(setGlobalErrorState(true, 'Login was not successful. Please try again.'))
    }
  } catch (e) {
    yield put(setGlobalErrorState(true, 'Login was not successful. Please try again.'))
  }
}

function * oAuthLogInSaga () {
  yield takeEvery(OAUTH_LOGGED_IN, callLoggedIn)
}

export default function * oAuthSaga () {
  yield all([
    fork(oAuthLogInSaga)
  ])
}
