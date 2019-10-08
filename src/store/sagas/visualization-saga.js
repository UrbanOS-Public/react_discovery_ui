import { takeEvery, put, call, fork, all } from 'redux-saga/effects'
import { GET_VISUALIZATION, getVisualizationSucceeded, getVisualizationFailed } from '../actions'
import { CREATE_VISUALIZATION, createVisualizationSucceeded, createVisualizationFailed } from '../actions'
import { AuthenticatedHTTPClient } from '../../utils/http-clients'

function* callEndpoint(clientFunction, endpoint, successAction, failureAction) {
  try {
    const response = yield call(clientFunction, endpoint)
    if (response.status === 200) {
      yield put(successAction(response.data))
    } else {
      yield put(failureAction(response.data))
    }
  } catch (e) {
    yield put(failureAction(e.message))
  }
}

function* getVisualization({ value: id }) {
  yield callEndpoint(AuthenticatedHTTPClient.get, `/api/v1/visualization/${id}`, getVisualizationSucceeded, getVisualizationFailed)
}

function* createVisualization({ value: { query, title } }) {
  yield callEndpoint(AuthenticatedHTTPClient.post, '/api/v1/visualization', { query, title }, createVisualizationSucceeded, createVisualizationFailed)
}

function* getVisualizationSaga() {
  yield takeEvery(GET_VISUALIZATION, getVisualization)
}

function* createVisualizationSaga() {
  yield takeEvery(CREATE_VISUALIZATION, createVisualization)
}

export default function* visualizationSaga() {
  yield all([
    fork(getVisualizationSaga),
    fork(createVisualizationSaga)
  ])
}

