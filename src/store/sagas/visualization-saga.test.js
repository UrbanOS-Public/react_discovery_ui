import { visualizationCreate, visualizationFetchFailure, visualizationCreateFailure, visualizationFetch, visualizationFetchSuccess, visualizationCreateSuccess } from '../actions'
import visualizationSaga from './visualization-saga'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { AuthenticatedHTTPClient } from '../../utils/http-clients'

describe('visualization-saga', () => {
  let store
  let sagaMiddleware
  const reducer = (state = [], action) => {
    return [...state, action]
  }

  beforeEach(() => {
    sagaMiddleware = createSagaMiddleware()
    store = createStore(reducer, applyMiddleware(sagaMiddleware))
    sagaMiddleware.run(visualizationSaga)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('getVisualization', () => {
    const id = "hello"
    const visualization = { id }
    describe('successfully', () => {
      beforeEach(() => {
        AuthenticatedHTTPClient.get = jest.fn(() => ({ status: 200, data: visualization }))
        store.dispatch(visualizationFetch(id))
      })

      it('calls the correct API endpoint', () => {
        expect(AuthenticatedHTTPClient.get).toHaveBeenCalledWith(`/api/v1/visualization/${id}`)
      })

      it('signals the visualization is available', () => {
        expect(store.getState()).toContainEqual(visualizationFetchSuccess(visualization))
      })
    })

    describe('with a non-success status code', () => {
      const nonSuccessStatusCode = 400
      beforeEach(() => {
        AuthenticatedHTTPClient.get = jest.fn(() => ({ status: nonSuccessStatusCode }))
      })

      it('signals the visualization is unavailable', () => {
        store.dispatch(visualizationFetch(id))

        expect(store.getState()).toContainEqual(visualizationFetchFailure(nonSuccessStatusCode))
      })
    })

    describe('with a thrown error', () => {
      const errorMessage = 'WRONG'
      beforeEach(() => {
        AuthenticatedHTTPClient.get = jest.fn(() => { throw new Error(errorMessage) })
      })

      it('signals the visualization is unavailable', () => {
        store.dispatch(visualizationFetch(id))

        expect(store.getState()).toContainEqual(visualizationFetchFailure(errorMessage))
      })
    })
  })
  describe('createVisualization', () => {
    const id = "hello"
    const title = "my first visualization"
    const query = "select hello from world"
    const returnedVisualization = { id, title, query }

    describe('successfully', () => {
      beforeEach(() => {
        AuthenticatedHTTPClient.post = jest.fn(() => ({ status: 200, data: returnedVisualization }))
        store.dispatch(visualizationCreate(title, query))
      })

      it('calls the correct API endpoint', () => {
        expect(AuthenticatedHTTPClient.post).toHaveBeenCalledWith('/api/v1/visualization', { title, query })
      })

      it('signals the visualization is available', () => {
        expect(store.getState()).toContainEqual(visualizationCreateSuccess(returnedVisualization))
      })
    })

    describe('with a non-success status code', () => {
      const nonSuccessStatusCode = 400
      beforeEach(() => {
        AuthenticatedHTTPClient.post = jest.fn(() => ({ status: nonSuccessStatusCode }))
      })

      it('signals the visualization is unavailable', () => {
        store.dispatch(visualizationCreate(title, query))

        expect(store.getState()).toContainEqual(visualizationCreateFailure(nonSuccessStatusCode))
      })
    })

    describe('with a thrown error', () => {
      const errorMessage = 'WRONG'
      beforeEach(() => {
        AuthenticatedHTTPClient.post = jest.fn(() => { throw new Error(errorMessage) })
      })

      it('signals the visualization is unavailable', () => {
        store.dispatch(visualizationCreate(title, query))

        expect(store.getState()).toContainEqual(visualizationCreateFailure(errorMessage))
      })
    })
  })
})
