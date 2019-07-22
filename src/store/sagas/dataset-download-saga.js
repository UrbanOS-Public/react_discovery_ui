import { takeEvery } from 'redux-saga/effects'
import { DOWNLOAD_DATASET, downloadDatasetSucceeded } from '../actions'
import apiInvoker from './api-invoker'

export default function * theRealDatasetSaga () {
  yield takeEvery(DOWNLOAD_DATASET, invokeApiWithParameter)
}

const invokeApiWithParameter = ({ value }) => {
  return apiInvoker(`/api/v1/dataset/${value.datasetId}/download?_format=${value.format}`, downloadDatasetSucceeded)()
}
