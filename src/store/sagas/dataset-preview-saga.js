import { takeEvery } from 'redux-saga/effects'
import { RETRIEVE_DATASET_PREVIEW, datasetPreview } from '../actions'
import apiInvoker from './api-invoker'

export default function* theRealDatasetSaga() {
  yield takeEvery(RETRIEVE_DATASET_PREVIEW, invokeApiWithId)
}

const invokeApiWithId = ({ value }) => {
  return apiInvoker({ endpoint: `/api/v1/dataset/${value}/preview`, actionator: datasetPreview })()
}
