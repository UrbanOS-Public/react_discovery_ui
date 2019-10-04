import { takeEvery, takeLast } from 'redux-saga/effects'
import { DATASET_RECOMMENDATIONS, datasetRecommendations } from '../actions'
import apiInvoker from './api-invoker'

export default function* datasetRecommendationSaga() {
  yield takeEvery(DATASET_RECOMMENDATIONS, invokeApiWithParameter)
}

const invokeApiWithParameter = ({ value }) => {
  console.log("calling api with" + value)
  return apiInvoker({ endpoint: `/api/v1/dataset/${value}/recommendations`, actionator: datasetRecommendations })()
}
