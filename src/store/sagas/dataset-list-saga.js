import { takeEvery, select } from 'redux-saga/effects'
import { DATASET_SEARCH, datasetSearchSucceeded, displayError } from '../actions'
import apiInvoker from './api-invoker'
import { getSearchParams } from '../selectors'


export default function * theRealDatasetSaga () {
  const params = yield select(getSearchParams);
  yield takeEvery(DATASET_SEARCH, apiInvoker({ endpoint: '/api/v1/dataset/search', actionator: datasetSearchSucceeded, queryParameterBuilder: () => params }))
}
