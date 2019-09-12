import { takeEvery } from 'redux-saga/effects'
import { DOWNLOAD_DATASET, downloadDatasetSucceeded, downloadDatasetFailed } from '../actions'
import apiInvoker from './api-invoker'

export default function* theRealDatasetSaga() {
  yield takeEvery(DOWNLOAD_DATASET, invokeApiWithParameter)
}

const invokeApiWithParameter = ({ value: { id, format } }) => {
  return apiInvoker({ endpoint: `/api/v1/dataset/${id}/download?_format=${format}`, actionator: downloadDatasetSucceeded, errorAction: downloadDatasetFailed() })()
}
