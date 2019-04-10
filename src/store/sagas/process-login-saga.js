import { takeLatest } from 'redux-saga/effects'
import { LOGIN_SUCCESS } from '../actions'
import { sessionStorage } from 'storage2'
import _ from 'lodash'

function * processLogin ({ value: { token, history } }) {
  yield sessionStorage.setItem('api-token', token)
  const location = _.get(history, 'location.state.from', { pathname: '/', search: '' })
  yield history.push({
    pathname: location.pathname,
    search: location.search
  })
}

export default function * processLoginSaga () {
  yield takeLatest(LOGIN_SUCCESS, processLogin)
}
