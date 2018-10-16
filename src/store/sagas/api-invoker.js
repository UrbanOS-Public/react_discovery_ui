import { put, call } from 'redux-saga/effects'
import { displayError } from '../actions'
import axios from 'axios'

export default (endpoint, actionator) => {
  return function * retrieveData () {
    try {
      const response = yield call(axios.get, url(endpoint))
      if (response.status !== 200) {
        yield put(displayError())
      } else {
        yield put(actionator(response.data))
      }
    } catch (e) {
      yield put(displayError())
    }
  }
}

const url = endpoint => {
  const apiHost = new URL(window.API_HOST)
  const fullURL = new URL(endpoint, apiHost)
  return fullURL.href
}
