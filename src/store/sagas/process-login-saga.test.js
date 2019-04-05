import { loginSuccess } from '../actions'
import processLoginSaga from './process-login-saga'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { sessionStorage } from 'storage2'

jest.mock('storage2')

describe('process-login-saga', () => {
  let store
  let sagaMiddleware
  const reducer = (state = [], action) => {
    return [...state, action]
  }

  beforeEach(() => {
    sagaMiddleware = createSagaMiddleware()
    store = createStore(reducer, applyMiddleware(sagaMiddleware))
    sagaMiddleware.run(processLoginSaga)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('sets the token into session storage', () => {
    const token = jest.fn()
    const history = {
      push: jest.fn(),
      location: {
        state: {
          from: '/somewhere-in-the-ui'
        }
      }
    }

    store.dispatch(loginSuccess({ token, history }))

    expect(sessionStorage.setItem).toHaveBeenCalledWith('api-token', token)
    expect(history.push).toHaveBeenCalledWith(history.location.state.from)
  })

  it('navigates to home when there is no preceding page', () => {
    const token = jest.fn()
    const history = {
      push: jest.fn(),
      location: {
        state: undefined
      }
    }

    store.dispatch(loginSuccess({ token, history }))
    expect(history.push).toHaveBeenCalledWith('/')
  })
})
