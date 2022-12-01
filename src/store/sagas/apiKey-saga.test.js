import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import apiKeySaga from './apiKey-saga'
import { AuthenticatedHTTPClient } from '../../utils/http-clients'
import { generateApiKey, generateApiKeySucceeded, setGlobalErrorState } from '../actions'

describe('apiKey-saga', () => {
  const reducer = (state = [], action) => {
    return [...state, action]
  }
  let sagaMiddleware, store
  beforeEach(() => {
    sagaMiddleware = createSagaMiddleware()
    store = createStore(reducer, applyMiddleware(sagaMiddleware))
    sagaMiddleware.run(apiKeySaga)
    AuthenticatedHTTPClient.patch = jest.fn()
  })

  const expectedErrorMessage = 'Could not generate api key. Please try again.'

  it('calls the correct API endpoint', () => {
    store.dispatch(generateApiKey())
    expect(AuthenticatedHTTPClient.patch).toHaveBeenCalledWith('/api/v1/generateApiKey', '')
  })

  it('dispatches a success message', () => {
    const fakeApiKey = 'someApiKey'
    AuthenticatedHTTPClient.patch = jest.fn(() => ({ status: 200, data: fakeApiKey }))
    store.dispatch(generateApiKey())
    expect(store.getState()).toContainEqual(generateApiKeySucceeded(fakeApiKey))
  })

  describe('api/v1/generateApiKey returns a non-success status code', () => {
    const nonSuccessStatusCode = 400
    beforeEach(() => {
      AuthenticatedHTTPClient.patch = jest.fn(() => ({ status: nonSuccessStatusCode }))
    })

    it('sets global error message', () => {
      store.dispatch(generateApiKey())

      expect(store.getState()).toContainEqual(setGlobalErrorState(true, expectedErrorMessage))
    })
  })

  describe('api/v1/generateApiKey throws an error', () => {
    beforeEach(() => {
      AuthenticatedHTTPClient.patch = jest.fn(() => { throw new Error() })
    })

    it('sets global error message', () => {
      store.dispatch(generateApiKey())

      expect(store.getState()).toContainEqual(setGlobalErrorState(true, expectedErrorMessage))
    })
  })
})
