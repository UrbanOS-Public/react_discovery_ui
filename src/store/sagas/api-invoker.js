import { put, call } from 'redux-saga/effects'
import { displayError } from '../actions'
import { AuthenticatedHTTPClient } from '../../utils/http-clients'
import qs from 'qs'

const defaultParamFunction = () => ({})

export default ({ endpoint, actionator, errorAction = displayError(), queryParameterBuilder = defaultParamFunction }) => {
  return function * retrieveData (action) {
    try {
      const query = {
        baseURL: window.API_HOST,
        params: queryParameterBuilder(action),
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
        withCredentials: true
      }
      const response = yield call(AuthenticatedHTTPClient.get, endpoint, query)
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
