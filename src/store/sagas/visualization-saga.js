import { takeEvery, put, call, fork, all } from 'redux-saga/effects'
import { VISUALIZATION_CREATE, VISUALIZATION_FETCH, visualizationFetchSuccess, visualizationFetchFailure, visualizationCreateSuccess, visualizationCreateFailure, setQueryText } from '../actions'
import { AuthenticatedHTTPClient } from '../../utils/http-clients'

function* callEndpoint(clientFunction, successEvent, failureEvent) {
  try {
    const response = yield call(clientFunction)
    
    if (response.status === 200) {
      yield put(setQueryText(response.data.query))
      yield put(successEvent(response.data))
    } else {
      yield put(failureEvent(response.status))
    }
  } catch (e) {
    yield put(failureEvent(e.message))
  }
}

function* fetchVisualization({ value: id }) {
  yield callEndpoint(() => AuthenticatedHTTPClient.get(`/api/v1/visualization/${id}`), visualizationFetchSuccess, visualizationFetchFailure)
}

function* createVisualization({ value: visualization }) {
  yield callEndpoint(() => AuthenticatedHTTPClient.post('/api/v1/visualization', visualization), visualizationCreateSuccess, visualizationCreateFailure)
}

function* fetchVisualizationSaga() {
  yield takeEvery(VISUALIZATION_FETCH, fetchVisualization)
}

function* createVisualizationSaga() {
  yield takeEvery(VISUALIZATION_CREATE, createVisualization)
}

export default function* visualizationSaga() {
  yield all([
    fork(fetchVisualizationSaga),
    fork(createVisualizationSaga)
  ])
}

