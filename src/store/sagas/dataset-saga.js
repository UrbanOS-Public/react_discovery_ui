import { put, takeEvery, call } from 'redux-saga/effects'
import { RETRIEVE_DATA_LIST, selectDataList, displayError } from '../actions'
import axios from 'axios'

export function * retrieveData () {
  try {
    const response = yield call(axios.get, `${window.API_HOST}/api/fetchDatasetSummaries`)
    if (response.status !== 200) {
      yield put(displayError())
    } else {
      yield put(selectDataList(response.data))
    }
  } catch (e) {
    yield put(displayError())
  }
}

export function * datasetSaga () {
  yield takeEvery(RETRIEVE_DATA_LIST, retrieveData)
}
