import { takeEvery } from 'redux-saga/effects'
import { RETRIEVE_DATASET, datasetDetails } from '../actions'
import apiInvoker from './api-invoker'

export default function * theRealDatasetSaga () {
  yield takeEvery(RETRIEVE_DATASET, invokeApiWithParameter)
}

const invokeApiWithParameter = ({ value }) => {
  return apiInvoker(`/v1/api/dataset/${value}`, datasetDetails)()
}
