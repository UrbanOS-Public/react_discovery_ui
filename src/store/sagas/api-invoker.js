import { put, call } from 'redux-saga/effects'
import { displayError } from '../actions'
import axios from 'axios'
import qs from 'qs'
import { sessionStorage } from 'storage2'
import _ from 'lodash'

const defaultParamFunction = () => ({})

export default (endpoint, actionator, queryParameterBuilder = defaultParamFunction) => {
  return function * retrieveData (action) {
    try {
      let query = {
        baseURL: window.API_HOST,
        params: queryParameterBuilder(action),
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' })
      }

      const token = sessionStorage.getItem('api-token')

      const headers = _.isNil(token) ? {} : { headers: { Authorization: `Bearer ${token}` } }

      const response = yield call(axios.get, endpoint, Object.assign({}, query, headers))

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
