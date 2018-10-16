import { fork, all } from 'redux-saga/effects'
import datasetListSaga from './dataset-list-saga'
import datasetSaga from './dataset-saga'

export default function * allSagas () {
  yield all([
    fork(datasetListSaga),
    fork(datasetSaga)
  ])
}
