import reducer from './index'
import { SELECT_DATA_LIST, DISPLAY_ERROR, DATASET_DETAILS, RETRIEVE_DATASET_PREVIEW, DATASET_PREVIEW, CLEAR_DATASET_DETAILS, LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions'
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

describe('UI Reducer', () => {
  it('RETRIEVE_DATASET_PREIVEW sets loading to true', () => {
    let currentState = {
      presentation: {
        isLoading: false
      }
    }
    let newState = reducer(currentState, { type: RETRIEVE_DATASET_PREVIEW })

    expect(newState.presentation.isLoading).toEqual(true)
  })

  it('DATASET_PREIVEW sets loading to false', () => {
    let currentState = {
      presentation: {
        isLoading: true
      }
    }
    let newState = reducer(currentState, { type: DATASET_PREVIEW })

    expect(newState.presentation.isLoading).toEqual(false)
  })

  it('DATASET_PREIVEW sets dataset_preivew', () => {
    let currentState = {
      presentation: {
      }
    }
    const expectedData = {
      firstName: 'Joe',
      lastName: 'Smith'
    }
    let newState = reducer(currentState, { type: DATASET_PREVIEW, value: expectedData })

    expect(newState.presentation.dataset_preview).toEqual(expectedData)
  })

  it('CLEAR_DATASET_DETAILS', () => {
    let currentState = {
      datasetReducer: {
        dataset: { id: 123 }
      }
    }

    let newState = reducer(currentState, { type: CLEAR_DATASET_DETAILS })

    expect(newState.datasetReducer.dataset).toEqual(undefined)
  })

  it('LOGIN sets loading to true', () => {
    let currentState = {
      presentation: {
        isLoading: false
      }
    }
    let newState = reducer(currentState, { type: LOGIN })

    expect(newState.presentation.isLoading).toEqual(true)
  })

  it('LOGIN_SUCCESS sets lastLoginAttemptFailed to false', () => {
    let currentState = {
      presentation: {
        lastLoginAttemptFailed: true
      }
    }
    let newState = reducer(currentState, { type: LOGIN_SUCCESS })

    expect(newState.presentation.lastLoginAttemptFailed).toEqual(false)
  })

  it('LOGIN_FAILURE sets lastLoginAttemptFailed to true', () => {
    let currentState = {
      presentation: {
        lastLoginAttemptFailed: false
      }
    }
    let newState = reducer(currentState, { type: LOGIN_FAILURE })

    expect(newState.presentation.lastLoginAttemptFailed).toEqual(true)
    expect(newState.presentation.isLoading).toEqual(false)
  })
})
