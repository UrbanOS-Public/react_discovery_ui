import { takeEvery, put, call, fork, all, select } from 'redux-saga/effects'
import { VISUALIZATION_SAVE, VISUALIZATION_LOAD, VISUALIZATIONS_LOAD_ALL, visualizationLoadSuccess, visualizationLoadFailure, visualizationSaveSuccess, visualizationSaveFailure, setQueryText, setChartInformation, executeFreestyleQuery, visualizationsLoadAllSuccess, visualizationsLoadAllFailure, VISUALIZATION_DELETE, visualizationDeleteFailure, visualizationDeleteSuccess, visualizationsLoadAll, retrieveDatasetReference, visualizationLoad, VISUALIZATION_LOAD_SUCCESS, VISUALIZATION_SAVE_SUCCESS } from '../actions'
import { AuthenticatedHTTPClient } from '../../utils/http-clients'
import { dereferencedChart } from '../visualization-selectors'

export function* loadVisualizationSaga() {
  yield takeEvery(VISUALIZATION_LOAD, loadVisualization)
  yield takeEvery(VISUALIZATION_LOAD_SUCCESS, loadDatasetReferences)
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

function* loadUserVisualizationsSaga() {
  yield takeEvery(VISUALIZATIONS_LOAD_ALL, loadUserVisualizations)
}

function* loadUserVisualizations() {
  try {
    const response = yield call(AuthenticatedHTTPClient.get, `/api/v1/visualization`)

    if (response.status < 400) {
      yield put(visualizationsLoadAllSuccess(response.data))
    } else {
      yield put(visualizationsLoadAllFailure(response.status))
    }
  } catch (e) {
    yield put(visualizationsLoadAllFailure(e.message))
  }
}

function* saveVisualizationSaga() {
  yield takeEvery(VISUALIZATION_SAVE, saveVisualization)
  yield takeEvery(VISUALIZATION_SAVE_SUCCESS, loadDatasetReferences)
}

export function* saveVisualization({ value: visualization, shouldCreateCopy }) {
  const chart = yield select(dereferencedChart)

  if (shouldCreateCopy) {
    visualization = removeId(visualization)
  }

  if (visualization.id) {
    yield handleSaveResponse(() => AuthenticatedHTTPClient.put(`/api/v1/visualization/${visualization.id}`, { ...visualization, chart }))
  } else {
    yield handleSaveResponse(() => AuthenticatedHTTPClient.post(`/api/v1/visualization`, { ...visualization, chart }))
  }
}

function* deleteVisualizationSaga() {
  yield takeEvery(VISUALIZATION_DELETE, deleteVisualization)
}

export function* deleteVisualization({ value }) {
  yield handleDeleteResponse(() => AuthenticatedHTTPClient.delete(`/api/v1/visualization/${value.id}`))
}

function removeId(visualization) {
  const { id, ...withoutId } = visualization
  return withoutId
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

function* handleDeleteResponse(clientFunction) {
  try {
    const response = yield call(clientFunction)

    if (response.status < 400) {
      yield put(visualizationDeleteSuccess())
    } else {
      yield put(visualizationDeleteFailure(response.status))
    }
  } catch (e) {
    yield put(visualizationDeleteFailure(e.message))
  }

  yield put(visualizationsLoadAll())
}

export function* loadDatasetReferences({ value }) {
  for (var datasetId of value.usedDatasets) {
    yield put(retrieveDatasetReference(datasetId));
  }
}

export default function* visualizationSaga() {
  yield all([
    fork(loadVisualizationSaga),
    fork(saveVisualizationSaga),
    fork(loadUserVisualizationsSaga),
    fork(deleteVisualizationSaga)
  ])
}

