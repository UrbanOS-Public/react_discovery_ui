import { takeLatest, put, call } from 'redux-saga/effects'
import { LOGIN, loginSuccess, loginFailure } from '../actions'
import axios from 'axios'

function * login ({ value: { username, password, history } }) {
  try {
    const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64')
    const response = yield call(axios.get, '/api/v1/login', {
      baseURL: window.API_HOST,
      headers: { 'Authorization': `Basic ${encodedCredentials}` }
    })

    if (response.status === 200) {
      yield put(loginSuccess({ token: response.headers.token, history }))
    } else {
      yield put(loginFailure(response.data))
    }
  } catch (e) {
    yield put(loginFailure(e.message))
  }
}

export default function * loginSaga () {
  yield takeLatest(LOGIN, login)
}
