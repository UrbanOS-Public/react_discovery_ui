import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import oAuthSaga from './oauth-saga'
import { AuthenticatedHTTPClient } from '../../utils/http-clients'
import { exportSpecifier, exportAllDeclaration } from '@babel/types'
import { oAuthCallLoggedIn } from '../actions'

describe('oauth-saga', () => {
  const reducer = (state = [], action) => {
    return [...state, action]
  }
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(reducer, applyMiddleware(sagaMiddleware))
  sagaMiddleware.run(oAuthSaga)
  AuthenticatedHTTPClient.post = jest.fn()

  it('calls the correct API endpoint', () => {
    store.dispatch(oAuthCallLoggedIn())
    expect(AuthenticatedHTTPClient.post).toHaveBeenCalledWith(`/api/v1/logged-in`, '')
  })
})
