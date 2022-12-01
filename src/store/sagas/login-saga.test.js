import { login, loginSuccess, loginFailure } from '../actions'
import loginSaga from './login-saga'
import mockAxios from 'axios'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

describe('login-saga', () => {
  let store
  let sagaMiddleware
  const reducer = (state = [], action) => {
    return [...state, action]
  }

  const username = 'lettuce'
  const password = 'tarpsoff99'
  const token = 'sus'
  const history = jest.fn()

  beforeEach(() => {
    window.DISC_API_URL = 'http://example.com/'

    sagaMiddleware = createSagaMiddleware()
    store = createStore(reducer, applyMiddleware(sagaMiddleware))
    sagaMiddleware.run(loginSaga)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('success', () => {
    const data = 'lettuce logged in.'
    const response = {
      status: 200,
      headers: {
        token: token
      },
      data: data
    }

    beforeEach(() => {
      mockAxios.get.mockImplementationOnce(() => (response))

      store.dispatch(login({ username, password, history }))
    })

    it('calls login api with the correct credentials', () => {
      expect(mockAxios.get).toHaveBeenCalledWith('/api/v1/login', {
        baseURL: window.DISC_API_URL,
        auth: { username, password },
        withCredentials: true
      })
    })

    it('dispatches a LOGIN_SUCCESS event based on success', () => {
      expect(store.getState()).toContainEqual(loginSuccess({ token, history }))
    })
  })

  describe('failure', () => {
    const data = 'lettuce failed to log in.'

    it('dispatches a LOGIN_FAILURE event based on 401 code', () => {
      const response = {
        status: 401,
        data: data
      }
      mockAxios.get.mockImplementationOnce(() => (response))

      store.dispatch(login({ username, password }))

      expect(store.getState()).toContainEqual(loginFailure(data))
    })

    it('dispatches a LOGIN_FAILURE event on a catastrophic failure', () => {
      const errorMsg = "It's all over"
      mockAxios.get.mockImplementationOnce(() => { throw new Error(errorMsg) })

      store.dispatch(login({ username, password }))

      expect(store.getState()).toContainEqual(loginFailure(errorMsg))
    })
  })
})
