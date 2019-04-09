import { takeLatest } from 'redux-saga/effects'
import { LOGIN_SUCCESS } from '../actions'
import { sessionStorage } from 'storage2'
import _ from 'lodash'

function * processLogin ({ value: { token, history } }) {
  yield sessionStorage.setItem('api-token', token)
  yield history.push(_.get(history, 'location.state.from', '/'))
}

export default function * processLoginSaga () {
  yield takeLatest(LOGIN_SUCCESS, processLogin)
}
