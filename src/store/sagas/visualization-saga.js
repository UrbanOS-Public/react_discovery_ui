import { takeEvery, put, call, fork, all, select } from 'redux-saga/effects'
import { VISUALIZATION_SAVE, VISUALIZATION_LOAD, visualizationLoadSuccess, visualizationLoadFailure, visualizationSaveSuccess, visualizationSaveFailure, setQueryText, setChartInformation, executeFreestyleQuery } from '../actions'
import { AuthenticatedHTTPClient } from '../../utils/http-clients'
import { dereferencedChart } from '../visualization-selectors'

function* loadVisualizationSaga() {
  yield takeEvery(VISUALIZATION_LOAD, loadVisualization)
}

function* loadVisualization({ value: id }) {
  try {
    const response = yield call(AuthenticatedHTTPClient.get, `/api/v1/visualization/${id}`)

    if (response.status < 400) {
      yield put(setChartInformation(response.data.chart))
      yield put(setQueryText(response.data.query))
      yield put(executeFreestyleQuery(response.data.query))
      yield put(visualizationLoadSuccess(response.data))
    } else {
      yield put(visualizationLoadFailure(response.status))
    }
  } catch (e) {
    yield put(visualizationLoadFailure(e.message))
  }
}

function* saveVisualizationSaga() {
  yield takeEvery(VISUALIZATION_SAVE, saveVisualization)
}

export function* saveVisualization({ value: visualization }) {
  const chart = yield select(dereferencedChart)

  if (visualization.id) {
    yield handleSaveResponse(() => AuthenticatedHTTPClient.put(`/api/v1/visualization/${visualization.id}`, {...visualization, chart}))
  } else {
    yield handleSaveResponse(() => AuthenticatedHTTPClient.post(`/api/v1/visualization`, {...visualization, chart}))
  }
}

function* handleSaveResponse(clientFunction) {
  try {
    const response = yield call(clientFunction)

    if (response.status < 400) {
      yield put(visualizationSaveSuccess(response.data))
    } else {
      yield put(visualizationSaveFailure(response.status))
    }
  } catch (e) {
    yield put(visualizationSaveFailure(e.message))
  }
}

export default function* visualizationSaga() {
  yield all([
    fork(loadVisualizationSaga),
    fork(saveVisualizationSaga)
  ])
}

