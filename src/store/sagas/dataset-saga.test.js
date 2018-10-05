import { RETRIEVE_DATA_LIST, DISPLAY_ERROR } from '../actions'
import { datasetSaga } from './dataset-saga'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import mockAxios from 'axios'
import dataStub from '../../../stubs/data-stub'

jest.mock('axios')

const reducer = (state = [], action) => {
  return [...state, action]
}

describe('dataset saga', () => {
  let store
  const fakeDataSetResponse = dataStub

  beforeEach(() => {
    let sagaMiddleware = createSagaMiddleware()
    store = createStore(reducer, applyMiddleware(sagaMiddleware))
    sagaMiddleware.run(datasetSaga)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('takes RETRIEVE_DATA_LIST and puts SELECT_DATA_LIST', () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve(({
        status: 200,
        data: fakeDataSetResponse
      }))
    )
    store.dispatch({ type: RETRIEVE_DATA_LIST })
    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:3000')
  })

  it('does the right thing when the network fails with an error', () => {
    mockAxios.get.mockImplementationOnce(() => { throw new Error('Network error') })
    store.dispatch({ type: RETRIEVE_DATA_LIST })
    expect(store.getState()).toContainEqual({
      type: DISPLAY_ERROR
    })
  })

  it('dispatches a display error if the status code is not 200', () => {
    mockAxios.get.mockImplementationOnce(() =>
      ({
        status: 420,
        data: fakeDataSetResponse
      })
    )
    store.dispatch({ type: RETRIEVE_DATA_LIST })
    expect(store.getState()).toContainEqual({
      type: DISPLAY_ERROR
    })
  })
})
