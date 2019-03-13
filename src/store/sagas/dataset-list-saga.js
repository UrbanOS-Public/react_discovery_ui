import { takeEvery } from 'redux-saga/effects'
import { RETRIEVE_DATA_LIST, selectDataList } from '../actions'
import apiInvoker from './api-invoker'

export default function * theRealDatasetSaga () {
  yield takeEvery(RETRIEVE_DATA_LIST, apiInvoker('/api/v1/dataset/search', selectDataList, queryParamBuilder))
}

const queryParamBuilder = action => ({
  offset: action.value.offset,
  limit: action.value.limit,
  sort: action.value.sort,
  query: action.value.query,
  facets: action.value.facets
})
