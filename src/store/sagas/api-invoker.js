import { put, call } from 'redux-saga/effects'
import { displayError } from '../actions'
import axios from 'axios'
import qs from 'qs'

const defaultParamFunction = () => ({})

export default (endpoint, actionator, queryParameterBuilder = defaultParamFunction) => {
  return function * retrieveData (action) {
    try {
      const response = yield call(axios.get, endpoint, {
        baseURL: window.API_HOST,
        params: queryParameterBuilder(action),
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' })
      })

      if (response.status === 200) {
        yield put(actionator(response.data))
      } else {
        yield put(displayError())
      }
    } catch (e) {
      yield put(displayError())
    }
  }
}
