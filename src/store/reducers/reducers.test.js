import reducer from './index'
import { SELECT_DATA_LIST, DISPLAY_ERROR, DATASET_DETAILS } from '../actions'
import datasetListStub from '../../../stubs/dataset-list-stub'
import datasetStub from '../../../stubs/dataset-details-stub'

describe('Dataset Reducer', () => {
  it('SELECT_DATA_LIST places Dataset list in the state', () => {
    let currentState = {
      datasetReducer: {
        total: 0
      }
    }
    let newState = reducer(currentState, { type: SELECT_DATA_LIST, value: datasetListStub })

    expect(newState.datasetReducer.datasets).toEqual(datasetListStub.results)
    expect(newState.datasetReducer.total).toEqual(datasetListStub.metadata.totalDatasets)
  })

  it('DISPLAY_ERROR sets datasetError to true', () => {
    let currentState = {
      datasetReducer: {
        datasetError: false
      }
    }
    let newState = reducer(currentState, { type: DISPLAY_ERROR })

    expect(newState.datasetReducer.datasetError).toEqual(true)
  })

  it('DATASET_DETAILS places dataset in the state', () => {
    let currentState = { }
    let newState = reducer(currentState, { type: DATASET_DETAILS, value: datasetStub })

    expect(newState.datasetReducer.dataset).toEqual(datasetStub)
  })
})
