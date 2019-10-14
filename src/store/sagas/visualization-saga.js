import { takeEvery, put, call, fork, all } from 'redux-saga/effects'
import { VISUALIZATION_SAVE, VISUALIZATION_LOAD, visualizationLoadSuccess, visualizationLoadFailure, visualizationSaveSuccess, visualizationSaveFailure, setQueryText } from '../actions'
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

function* loadVisualization({ value: id }) {
  yield callEndpoint(() => AuthenticatedHTTPClient.get(`/api/v1/visualization/${id}`), visualizationLoadSuccess, visualizationLoadFailure)
}

function* saveVisualization({ value: visualization }) {
    /* yield put(visualizationSaveFailure("bad stuff")) */
    yield callEndpoint(() => AuthenticatedHTTPClient.post('/api/v1/visualization', visualization), visualizationSaveSuccess, visualizationSaveFailure)
}

function* loadVisualizationSaga() {
  yield takeEvery(VISUALIZATION_LOAD, loadVisualization)
}

function* saveVisualizationSaga() {
  yield takeEvery(VISUALIZATION_SAVE, saveVisualization)
}

export default function* visualizationSaga() {
  yield all([
    fork(loadVisualizationSaga),
    fork(saveVisualizationSaga)
  ])
}

