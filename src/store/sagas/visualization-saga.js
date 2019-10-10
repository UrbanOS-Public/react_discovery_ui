import { takeEvery, put, call, fork, all } from 'redux-saga/effects'
import { GET_VISUALIZATION, CREATE_VISUALIZATION, visualizationAvailable, visualizationUnavailable, setQueryText } from '../actions'
import { AuthenticatedHTTPClient } from '../../utils/http-clients'

function* callEndpoint(clientFunction) {
  try {
    const response = yield call(clientFunction)
    
    if (response.status === 200) {
      yield put(setQueryText(response.data.query))
      yield put(visualizationAvailable(response.data))
    } else {
      yield put(visualizationUnavailable(response.status))
    }
  } catch (e) {
    yield put(visualizationUnavailable(e.message))
  }
}

function* getVisualization({ value: id }) {
  yield callEndpoint(() => AuthenticatedHTTPClient.get(`/api/v1/visualization/${id}`))
}

function* createVisualization({ value: visualization }) {
  yield callEndpoint(() => AuthenticatedHTTPClient.post('/api/v1/visualization', visualization))
}

function* getVisualizationSaga() {
  yield takeEvery(GET_VISUALIZATION, getVisualization)
}

function* createVisualizationSaga() {
  yield takeEvery(CREATE_VISUALIZATION, createVisualization)
}

export { getVisualizationSaga, createVisualizationSaga }

export default function* visualizationSaga() {
  yield all([
    fork(getVisualizationSaga),
    fork(createVisualizationSaga)
  ])
}

