import { put, call } from 'redux-saga/effects'
import { displayError } from '../actions'
import axios from 'axios'

const defaultParamFunction = () => ({})

export default (endpoint, actionator, queryParameterBuilder = defaultParamFunction) => {
  return function * retrieveData (action) {
    try {
      const response = yield call(axios.get, endpoint, {
        baseURL: window.API_HOST,
        params: queryParameterBuilder(action)
      })

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
