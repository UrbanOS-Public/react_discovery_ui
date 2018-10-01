export const ADD_TO_COUNT = 'ADD_TO_COUNT'

export const SUBTRACT_FROM_COUNT = 'SUBTRACT_FROM_COUNT'

export const subtractFromCount = (value) => {
  return { type: SUBTRACT_FROM_COUNT, value: value }
}

export const addToCount = (value) => {
  return { type: ADD_TO_COUNT, value: value }
}
