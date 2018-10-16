import { DISPLAY_ERROR } from '../actions'
import apiInvoker from './api-invoker'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import mockAxios from 'axios'
import fakeDataSetResponse from '../../../stubs/data-stub'

jest.mock('axios')

const reducer = (state = [], action) => {
  return [...state, action]
}

describe('api-invoker', () => {
  let store, sagaMiddleware, actionator

  beforeEach(() => {
    sagaMiddleware = createSagaMiddleware()
    store = createStore(reducer, applyMiddleware(sagaMiddleware))
    actionator = jest.fn().mockReturnValue({ type: 'unused' })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('invokes api with valid url when', () => {
    const validUrl = 'http://fake.com/gohome'

    it('host and path have slashes', () => {
      window.API_HOST = 'http://fake.com/'
      sagaMiddleware.run(apiInvoker('/gohome', actionator))

      expect(mockAxios.get).toHaveBeenCalledWith(validUrl)
    })

    it('host has a slash', () => {
      window.API_HOST = 'http://fake.com/'
      sagaMiddleware.run(apiInvoker('gohome', actionator))

      expect(mockAxios.get).toHaveBeenCalledWith(validUrl)
    })

    it('neither have slashes', () => {
      window.API_HOST = 'http://fake.com'
      sagaMiddleware.run(apiInvoker('gohome', actionator))

      expect(mockAxios.get).toHaveBeenCalledWith(validUrl)
    })

    it('host has multiple slashes and endpoint has slash', () => {
      window.API_HOST = 'http://fake.com////'
      sagaMiddleware.run(apiInvoker('/gohome', actionator))

      expect(mockAxios.get).toHaveBeenCalledWith(validUrl)
    })
  })

  it('calls actionator when successfull', () => {
    mockAxios.get.mockImplementationOnce(() => ({
      status: 200,
      data: fakeDataSetResponse
    })
    )

    sagaMiddleware.run(apiInvoker('', actionator))

    expect(actionator).toHaveBeenCalledWith(fakeDataSetResponse)
  })

  it('does the right thing when the network fails with an error', () => {
    mockAxios.get.mockImplementationOnce(() => { throw new Error('Network error') })

    sagaMiddleware.run(apiInvoker('', actionator))

    expect(store.getState()).toContainEqual({
      type: DISPLAY_ERROR
    })
  })

  it('dispatches a display error if the status code is not 200', () => {
    mockAxios.get.mockImplementationOnce(() =>
      ({
        status: 421,
        data: fakeDataSetResponse
      })
    )

    sagaMiddleware.run(apiInvoker('', actionator))

    expect(store.getState()).toContainEqual({
      type: DISPLAY_ERROR
    })
  })
})
