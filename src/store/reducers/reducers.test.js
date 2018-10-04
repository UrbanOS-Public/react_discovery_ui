import reducer from './index'
import { ADD_TO_COUNT, SUBTRACT_FROM_COUNT } from '../actions'

describe('Discovery App reducers', () => {
  it('add the value to the count if it gets an ADD_TO_COUNT action', () => {
    let currentState = { counting: { count: 3 } }
    let newState = reducer(currentState, { type: ADD_TO_COUNT, value: 4 })

    expect(newState.counting.count).toEqual(7)
  })

  it('subtracts the value from the count if it gets an SUBTRACT_FROM_COUNT action', () => {
    let currentState = { counting: { count: 3 } }
    let newState = reducer(currentState, { type: SUBTRACT_FROM_COUNT, value: 4 })

    expect(newState.counting.count).toEqual(-1)
  })

  it('returns the original state if it gets an unknown action', () => {
    let currentState = { counting: { count: 3 } }
    let newState = reducer(currentState, { type: 'WEIRD_ACTION' })

    expect(newState).toEqual(currentState)
  })
})
