import { takeEvery } from 'redux-saga/effects'
import { RETRIEVE_DATASET, datasetDetails } from '../actions'
import apiInvoker from './api-invoker'

export default function * theRealDatasetSaga () {
  yield takeEvery(RETRIEVE_DATASET, invokeApiWithParameter)
}

const invokeApiWithParameter = ({ value }) => {
  return apiInvoker({ endpoint: `/api/v1/organization/${value.organization_name}/dataset/${value.dataset_name}`, actionator: datasetDetails })()
}
