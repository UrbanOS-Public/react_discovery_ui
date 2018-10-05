import reducer from './index'
import { SELECT_DATA_LIST, DISPLAY_ERROR } from '../actions'
import { dataStub } from '../../../stubs/data-stub'

describe('Dataset Reducer', () => {
  it('SELECT_DATA_LIST places Dataset list in the state', () => {
    let currentState = { }
    let newState = reducer(currentState, { type: SELECT_DATA_LIST, value: dataStub })

    expect(newState.datasetReducer.dataset).toEqual(dataStub)
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
})
