import { takeEvery, put, call, fork, all } from 'redux-saga/effects'
import { AuthenticatedHTTPClient } from '../../utils/http-clients'
import { OAUTH_LOGGED_IN } from '../actions'

function* callLoggedIn() {
  yield callEndpoint(() => AuthenticatedHTTPClient.post('/api/v1/logged-in', ''))
}

function* oAuthLogInSaga() {
  yield takeEvery(OAUTH_LOGGED_IN, callLoggedIn)
}

export default function* oAuthSaga() {
  yield all([
    fork(oAuthLogInSaga)
  ])
}
