import reducer from './index'
import {
  SELECT_DATA_LIST,
  DISPLAY_ERROR,
  DATASET_DETAILS,
  RETRIEVE_DATASET_PREVIEW,
  DATASET_PREVIEW,
  CLEAR_DATASET_DETAILS,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  DOWNLOAD_DATASET_SUCCEEDED,
  QUERY_DATASET_SUCCEEDED,
  QUERY_DATASET,
  QUERY_DATASET_FAILED,
  FREESTYLE_QUERY_DATASET,
  CLEAR_DATASET_PREVIEW
} from '../actions'
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
    let currentState = {}
    let newState = reducer(currentState, { type: DATASET_DETAILS, value: datasetStub })

    expect(newState.datasetReducer.dataset).toEqual(datasetStub)
  })

  it('DOWNLOAD_DATASET_SUCCEEDED places downloaded data in state', () => {
    let currentState = {}
    const response = { id: 123 }

    let newState = reducer(currentState, { type: DOWNLOAD_DATASET_SUCCEEDED, value: response })

    expect(newState.datasetReducer.downloadedDataset).toEqual(response)
  })

  it('QUERY_DATASET_SUCCEEDED places query data in state', () => {
    let currentState = {}
    const response = { id: 123 }

    let newState = reducer(currentState, { type: QUERY_DATASET_SUCCEEDED, value: response })

    expect(newState.datasetReducer.datasetQueryResult).toEqual(response)
  })

  describe('CLEAR_DATASET_DETAILS', () => {
    const currentState = {
      datasetReducer: {
        dataset: { id: 123 },
        downloadedDataset: { id: 123 }
      }
    }
    let newState

    beforeEach(() => {
      newState = reducer(currentState, { type: CLEAR_DATASET_DETAILS })
    })

    it('clears dataset', () => {
      expect(newState.datasetReducer.dataset).toEqual(undefined)
    })

    it('clears downloadedDataset', () => {
      expect(newState.datasetReducer.downloadedDataset).toEqual(undefined)
    })
  })
})

describe('UI Reducer', () => {
  it('RETRIEVE_DATASET_PREVIEW sets previewLoading to true', () => {
    let currentState = {
      presentation: {
        previewLoading: false
      }
    }
    let newState = reducer(currentState, { type: RETRIEVE_DATASET_PREVIEW })

    expect(newState.presentation.previewLoading).toEqual(true)
  })

  it('DATASET_PREIVEW sets previewLoading to false', () => {
    let currentState = {
      presentation: {
        previewLoading: true
      }
    }
    let newState = reducer(currentState, { type: DATASET_PREVIEW })

    expect(newState.presentation.previewLoading).toEqual(false)
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

  it('CLEAR_DATASET_PREVIEW clears out preview data', () => {
    let currentState = {
      presentation: {
        dataset_preview: 'something',
        previewLoading: true
      }
    }
    const expectedData = {
      dataset_preview: undefined,
      previewLoading: false
    }
    let newState = reducer(currentState, { type: CLEAR_DATASET_PREVIEW})

    expect(newState.presentation).toEqual(expectedData)
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
    expect(newState.presentation.isLoading).toEqual(false)
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

  it('QUERY_DATASET sets loading to true', () => {
    let currentState = {}

    let newState = reducer(currentState, { type: QUERY_DATASET })

    expect(newState.presentation.isLoading).toEqual(true)
  })

  it('FREESTYLE_QUERY_DATASET sets loading to true', () => {
    let currentState = {}

    let newState = reducer(currentState, { type: FREESTYLE_QUERY_DATASET })

    expect(newState.presentation.isLoading).toEqual(true)
  })


  describe('QUERY_DATASET_SUCCEEDED', () => {
    let newState

    beforeEach(() => {
      const currentState = { presentation: { isLoading: true } }

      newState = reducer(currentState, { type: QUERY_DATASET_SUCCEEDED, value: { message: 'bad thing' } })
    })

    it('sets loading to false', () => {
      expect(newState.presentation.isLoading).toEqual(false)
    })

    it('unsets query failure message', () => {
      expect(newState.presentation.queryFailureMessage).toEqual('')
    })
  })

  describe('QUERY_DATASET_FAILED', () => {
    let newState

    beforeEach(() => {
      const currentState = { presentation: { isLoading: true } }

      newState = reducer(currentState, { type: QUERY_DATASET_FAILED, value: { message: 'bad thing' } })
    })

    it('sets loading to false', () => {
      expect(newState.presentation.isLoading).toEqual(false)
    })

    it('sets query failure message', () => {
      expect(newState.presentation.queryFailureMessage).toEqual('bad thing')
    })
  })
})
