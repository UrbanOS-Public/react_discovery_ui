import { takeLatest, put, call } from 'redux-saga/effects'
import { LOGOUT, logoutSuccess, logoutFailure } from '../actions'
import axios from 'axios'

function * logout ({ value: { username, password, history } }) {
  try {
    const token = sessionStorage.getItem('api-token')
    const location = _.get(history, 'location.state.from', { pathname: '/', search: '' })
    const response = yield call(axios.get, '/api/v1/logout', {
      baseURL: window.API_HOST,
      headers: { 'Authorization': `Bearer ${token}` },
      withCredentials: true
    })

    if (response.status === 200) {
      yield put(logoutSuccess({ token: response.headers.token, history }))
      sessionStorage.removeItem('api-token')
      yield history.push({
        pathname: location.pathname,
        search: location.search
      })
    } else {
      yield put(logoutFailure(response.data))
    }
  } catch (e) {
    yield put(logoutFailure(e.message))
  }
}

export default function * logoutSaga () {
  yield takeLatest(LOGOUT, logout)
}
