import { takeEvery, select, take } from 'redux-saga/effects'
import { DATASET_SEARCH, UPDATE_DATASET_SEARCH_PARAMS, datasetSearchSucceeded, displayError } from '../actions'
import apiInvoker from './api-invoker'
import { getSearchParams } from '../selectors'


export default function * theRealDatasetSaga () {
  while (true) {
    yield take(UPDATE_DATASET_SEARCH_PARAMS)
    let search = yield take(DATASET_SEARCH)
    const params = yield select(getSearchParams);
    let invoker = apiInvoker({ endpoint: '/api/v1/dataset/search', actionator: datasetSearchSucceeded, queryParameterBuilder: () => params })
    yield invoker(search)
  }
}
