import { takeEvery } from 'redux-saga/effects'
import { RETRIEVE_DATASET_REFERENCE, RETRIEVE_DATASET, datasetDetails, datasetReference } from '../actions'
import apiInvoker from './api-invoker'

export default function * theRealDatasetSaga () {
  yield takeEvery(RETRIEVE_DATASET, invokeApiWithNames)
  yield takeEvery(RETRIEVE_DATASET_REFERENCE, invokeApiWithId)
}

const invokeApiWithNames = ({ value }) => {
  return apiInvoker({ endpoint: `/api/v1/organization/${value.organization_name}/dataset/${value.dataset_name}`, actionator: datasetDetails })()
}

const invokeApiWithId = ({value}) => {
  return apiInvoker({ endpoint: `/api/v1/dataset/${value}`, actionator: datasetReference })()
}