import { put, call } from 'redux-saga/effects'
import { displayError } from '../actions'
import axios from 'axios'
import qs from 'qs'

const defaultParamFunction = () => ({})

export default ({ endpoint, actionator, errorAction = displayError(), queryParameterBuilder = defaultParamFunction }) => {
  return function* retrieveData(action) {
    try {
      console.log("INVOKER!!!")
      let query = {
        baseURL: window.API_HOST,
        params: queryParameterBuilder(action),
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
        withCredentials: true
      }
      console.log("QUERY!!!", query)
      const response = yield call(axios.get, endpoint, query)
      console.log("RESPONSE!!!", response)
      if (response.status === 200) {
        yield put(actionator(response.data))
      } else {
        yield put(errorAction)
      }
    } catch (e) {
      console.error(e)
      yield put(errorAction)
    }
  }
}
