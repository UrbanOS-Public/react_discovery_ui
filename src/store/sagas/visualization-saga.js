import { takeEvery, put, call, fork, all, select } from 'redux-saga/effects'
import { VISUALIZATION_SAVE, VISUALIZATION_UPDATE, VISUALIZATION_LOAD, visualizationLoadSuccess, visualizationLoadFailure, visualizationSaveSuccess, visualizationSaveFailure, setQueryText } from '../actions'
import { AuthenticatedHTTPClient } from '../../utils/http-clients'
import { dereferencedChart } from '../visualization-selectors'

function* loadVisualizationSaga() {
  yield takeEvery(VISUALIZATION_LOAD, loadVisualization)
}

function* loadVisualization({ value: id }) {
  yield callEndpoint(() => AuthenticatedHTTPClient.get(`/api/v1/visualization/${id}`), visualizationLoadSuccess, visualizationLoadFailure)
}

function* saveVisualizationSaga() {
  yield takeEvery(VISUALIZATION_SAVE, saveVisualization)
}

function* saveVisualization({ value: visualization }) {
  const chart = yield select(dereferencedChart)
  yield callEndpoint(() => AuthenticatedHTTPClient.post('/api/v1/visualization', { ...visualization, chart }), visualizationSaveSuccess, visualizationSaveFailure)
}

exports.saveVisualization = saveVisualization

function* updateVisualizationSaga() {
  yield takeEvery(VISUALIZATION_UPDATE, updateVisualization)
}

function* updateVisualization({ value: visualization }) {
  const chart = yield select(dereferencedChart)
  yield callEndpoint(() => AuthenticatedHTTPClient.put(`/api/v1/visualization/${visualization.id}`, {...visualization, chart}), visualizationSaveSuccess, visualizationSaveFailure)
}

exports.updateVisualization = updateVisualization

function* callEndpoint(clientFunction, successEvent, failureEvent) {
  try {
    const response = yield call(clientFunction)

    if (response.status < 400) {
      yield put(setQueryText(response.data.query))
      yield put(successEvent(response.data))
    } else {
      yield put(failureEvent(response.status))
    }
  } catch (e) {
    yield put(failureEvent(e.message))
  }
}

export default function* visualizationSaga() {
  yield all([
    fork(loadVisualizationSaga),
    fork(saveVisualizationSaga),
    fork(updateVisualizationSaga)
  ])
}

