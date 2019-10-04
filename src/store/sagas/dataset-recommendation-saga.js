import { takeEvery } from 'redux-saga/effects'
import { DATASET_RECOMMENDATIONS, datasetRecommendations } from '../actions'
import apiInvoker from './api-invoker'

export default function* datasetRecommendationSaga() {
  yield takeEvery(DATASET_RECOMMENDATIONS, invokeApiWithParameter)
}

const invokeApiWithParameter = ({ value }) => {
  console.log("calling api")
  return apiInvoker({ endpoint: `/api/v1/${value.datasetId}/recommendations`, actionator: datasetRecommendations })()
}
