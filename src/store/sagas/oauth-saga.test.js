import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import oAuthSaga from './oauth-saga'
import { AuthenticatedHTTPClient } from '../../utils/http-clients'
import { exportSpecifier, exportAllDeclaration } from '@babel/types'
import { oAuthCallLoggedIn , setGlobalErrorState} from '../actions'

describe('oauth-saga', () => {
  const reducer = (state = [], action) => {
    return [...state, action]
  }
  let sagaMiddleware, store
  beforeEach(() => {
    sagaMiddleware = createSagaMiddleware()
    store = createStore(reducer, applyMiddleware(sagaMiddleware))
    sagaMiddleware.run(oAuthSaga)
    AuthenticatedHTTPClient.post = jest.fn()
  })

  const expectedLoginErrorMessage = "Login was not successful. Please try again."

  it('calls the correct API endpoint', () => {
    store.dispatch(oAuthCallLoggedIn())
    expect(AuthenticatedHTTPClient.post).toHaveBeenCalledWith(`/api/v1/logged-in`, '')
  })

  describe('api/v/1/logged-in returns a non-success status code', () => {
    const nonSuccessStatusCode = 400
    beforeEach(() => {
      AuthenticatedHTTPClient.post = jest.fn(() => ({ status: nonSuccessStatusCode }))
    })

    it('sets global error message', () => {
      store.dispatch(oAuthCallLoggedIn())

      expect(store.getState()).toContainEqual(setGlobalErrorState(true, expectedLoginErrorMessage))
    })
  })

  describe('api/v/1/logged-in throws an error', () => {
    beforeEach(() => {
      AuthenticatedHTTPClient.post = jest.fn(() => { throw new Error() })
    })

    it('sets global error message', () => {
      store.dispatch(oAuthCallLoggedIn())

      expect(store.getState()).toContainEqual(setGlobalErrorState(true, expectedLoginErrorMessage))
    })
  })
})
