import { takeEvery } from 'redux-saga/effects'
import { QUERY_DATASET, queryDatasetSucceeded } from '../actions'
import apiInvoker from './api-invoker'

export default function* datasetQuerySaga() {
  yield takeEvery(QUERY_DATASET, invokeApiWithParameter)
}

const invokeApiWithParameter = ({ organizationName, datasetName, limit, format }) => {
  return apiInvoker(
    { endpoint: `/api/v1/organization/${organizationName}/dataset/${datasetName}/query?limit=${limit}&_format=${format}`, actionator: queryDatasetSucceeded }
  )()
}
