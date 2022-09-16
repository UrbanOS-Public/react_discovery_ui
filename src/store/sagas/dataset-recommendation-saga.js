import { takeEvery, takeLast } from 'redux-saga/effects'
import { DATASET_RECOMMENDATIONS, datasetRecommendationsSucceeded } from '../actions'
import apiInvoker from './api-invoker'

export default function * datasetRecommendationSaga () {
  yield takeEvery(DATASET_RECOMMENDATIONS, invokeApiWithParameter)
}

const invokeApiWithParameter = ({ value }) => {
  return apiInvoker({ endpoint: `/api/v1/dataset/${value}/recommendations`, actionator: datasetRecommendationsSucceeded })()
}
