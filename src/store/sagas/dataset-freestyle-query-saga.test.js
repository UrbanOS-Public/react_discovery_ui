import {
  executeFreestyleQuery, setQuerySuccess, setQueryInProgress, setQueryFailure, cancelFreestyleQuery
} from '../actions'
import freestyleQuerySaga from './dataset-freestyle-query-saga'
import mockAxios from 'axios'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import oneTrueReducer from '../reducers'

jest.mock('axios')

const ERROR_MESSAGE_CONSTANT = 'Query failure.  There may be a syntax issue.'

describe('dataset-freestyle-query-saga', () => {
  let store
  let sagaMiddleware
  const reducer = (state = [], action) => {
    return [...state, action]
  }

  const queryText = 'select * from lettuce'

  beforeEach(() => {
    window.API_HOST = 'http://example.com/'

    mockAxios.CancelToken = { source: () => ({ token: {} }) }

    sagaMiddleware = createSagaMiddleware()
    store = createStore(reducer, applyMiddleware(sagaMiddleware))
    sagaMiddleware.run(freestyleQuerySaga)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('success', () => {
    const queryData = [{ hello: "world" }, { hello: "columbus" }]
    const response = {
      status: 200,
      data: queryData
    }

    beforeEach(() => {
      mockAxios.post.mockImplementationOnce(() => (response))

      store.dispatch(executeFreestyleQuery(queryText))
    })

    it('calls multiple query api with query', () => {
      expect(mockAxios.post).toHaveBeenCalledWith('/api/v1/query', queryText, {
        cancelToken: expect.any(Object),
        baseURL: window.API_HOST,
        withCredentials: true,
        headers: { "Content-Type": "text/plain" },
        validateStatus: false
      })
    })

    it('dispatches a QUERY_DATASET_SUCCEEDED event', () => {
      expect(store.getState()).toContainEqual(setQuerySuccess(queryData))
    })

    it('dispatches a QUERY_DATASET_IN_PROGRESS event', () => {
      expect(store.getState()).toContainEqual(setQueryInProgress({ token: {} }))
    })
  })

  describe('failure', () => {
    it('dispatches a QUERY_DATASET_FAILED event based on 400 code', () => {
      const data = { message: "bad things happened" }
      const response = {
        status: 400,
        data
      }
      mockAxios.post.mockImplementationOnce(() => (response))

      store.dispatch(executeFreestyleQuery(queryText))

      expect(store.getState()).toContainEqual(setQueryFailure(ERROR_MESSAGE_CONSTANT))
    })

    it('dispatches a QUERY_DATASET_FAILED event on a catastrophic failure', () => {
      const errorMsg = "It's all over"

      mockAxios.post.mockImplementationOnce(() => { throw new Error(errorMsg) })

      store.dispatch(executeFreestyleQuery(queryText))

      console.log(store.getState())

      expect(store.getState()).toContainEqual(setQueryFailure(ERROR_MESSAGE_CONSTANT))
    })
  })


})

describe('dataset-freestyle-query-saga QUERY_DATASET_CANCELLED event', () => {
  let store
  let sagaMiddleware
  let cancelMock

  beforeEach(() => {
    mockAxios.CancelToken = { source: () => ({ token: {} }) }

    sagaMiddleware = createSagaMiddleware()
    store = createStore(oneTrueReducer, applyMiddleware(sagaMiddleware))
    sagaMiddleware.run(freestyleQuerySaga)

    cancelMock = jest.fn()
    const cancelToken = { token: {}, cancel: cancelMock }

    store.dispatch(setQueryInProgress(cancelToken))
    store.dispatch(cancelFreestyleQuery())
  })

  it('cancels the query', () => {
    expect(cancelMock).toHaveBeenCalled()
  })
})
