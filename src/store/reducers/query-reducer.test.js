import reducer from './query-reducer'

import { setQueryText, clearQueryText, setQuerySuccess, setQueryFailure, setQueryInProgress, resetQuery } from '../actions'

describe('queryReducer', () => {
  it('setQueryText triggers an action that sets the queryText', () => {
    const currentState = { queryText: '' }
    const queryText = 'SELECT something FROM somewhere'

    const newState = reducer(currentState, setQueryText(queryText))

    expect(newState.queryText).toEqual(queryText)
  })

  it('clearQueryText triggers an action that clears the queryText', () => {
    const currentState = { queryText: 'SELECT something FROM somewhere' }
    const newState = reducer(currentState, clearQueryText())

    expect(newState.queryText).toEqual('')
  })

  it('setQuerySuccess triggers an action that sets the queryData', () => {
    const currentState = {
      queryData: {},
      queryFailureMessage: 'Maybe something',
      isQueryLoading: true,
      cancelToken: jest.fn()
    }
    const expectedData = { some: 'data' }
    const newState = reducer(currentState, setQuerySuccess(expectedData))

    expect(newState.queryData).toEqual(expectedData)
    expect(newState.queryFailureMessage).toEqual('')
    expect(newState.isQueryLoading).toBe(false)
    expect(newState.cancelToken).toBe(null)
  })

  it('setQueryFailure triggers an action that sets the queryFailureMessage', () => {
    const currentState = {
      queryData: { a: 5 },
      queryFailureMessage: '',
      isQueryLoading: true,
      cancelToken: jest.fn()
    }
    const expectedMessage = 'Ya done goofed'
    const newState = reducer(currentState, setQueryFailure(expectedMessage))

    expect(newState.queryFailureMessage).toEqual(expectedMessage)
    expect(newState.queryData).toEqual(currentState.queryData)
    expect(newState.isQueryLoading).toBe(false)
    expect(newState.cancelToken).toBe(null)
  })

  it('setQueryInProgress triggers an action that sets the isQueryLoading and cancelToken', () => {
    const currentState = {
      isQueryLoading: false,
      cancelToken: null
    }
    const expectedCancel = jest.fn()
    const newState = reducer(currentState, setQueryInProgress(expectedCancel))

    expect(newState.cancelToken).toBe(expectedCancel)
    expect(newState.isQueryLoading).toBe(true)
    expect(newState.queryHasBeenExecuted).toBe(true)
  })

  it('resetQuery resets to the default state', () => {
    const currentState = {
      queryText: 'select * from lucky_charms',
      queryData: ['stuff'],
      queryFailureMessage: 'oh noooooo',
      isQueryLoading: true,
      cancelToken: 'cancelled',
      queryHasBeenExecuted: true
    }

    const newState = reducer(currentState, resetQuery())

    const expected = {
      queryText: '',
      queryData: null,
      queryFailureMessage: '',
      isQueryLoading: false,
      cancelToken: null,
      queryHasBeenExecuted: false
    }
    expect(newState).toEqual(expected)
  })
})
