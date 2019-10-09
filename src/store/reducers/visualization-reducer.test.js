import reducer from './visualization-reducer'
import {
  getVisualization,
  createVisualization,
  visualizationAvailable,
  visualizationUnavailable,
  resetVisualization
} from '../actions'

describe('Visualization Reducer', () => {
  let newState, previousState

  describe('GET_VISUALIZATION', () => {
    beforeEach(() => {
      previousState = {
        visualization: { id: 'existing' },
        loading: false,
        error: true
      }
      newState = reducer(previousState, getVisualization("viz_id"))
    })

    it('sets `loading` state to true', () => {
      expect(newState.loading).toBeTruthy()
    })

    it('does not modify other properties', () => {
      const { loading: _c, ...previousOthers } = previousState
      const { loading: _n, ...newOthers } = newState
      expect(newOthers).toEqual(previousOthers)
    })
  })

  describe('CREATE_VISUALIZATION', () => {
    beforeEach(() => {
      previousState = {
        visualization: { id: 'existing' },
        loading: false,
        error: true
      }
      newState = reducer(previousState, createVisualization("hello", "world"))
    })

    it('sets `loading` state to true', () => {
      expect(newState.loading).toBeTruthy()
    })

    it('does not modify other properties', () => {
      const { loading: _c, ...previousOthers } = previousState
      const { loading: _n, ...newOthers } = newState
      expect(newOthers).toEqual(previousOthers)
    })
  })

  describe('VISUALIZATION_AVAILABLE', () => {
    const newVisualization = { id: 'new' }
    beforeEach(() => {
      previousState = {
        visualization: { id: 'existing' },
        loading: true,
        error: true
      }
      newState = reducer(previousState, visualizationAvailable(newVisualization))
    })

    it('sets `visualization` state to the visualization', () => {
      expect(newState.visualization).toEqual(newVisualization)
    })

    it('sets `loading` state to false', () => {
      expect(newState.loading).toBeFalsy()
    })

    it('sets `error` state to false', () => {
      expect(newState.error).toBeFalsy()
    })
  })

  describe('VISUALIZATION_UNAVAILABLE', () => {
    const errorMessage = 'bad stuff'
    const previousVisualization = { id: 'existing' }

    beforeEach(() => {
      previousState = {
        visualization: previousVisualization,
        loading: true,
        error: false
      }
      newState = reducer(previousState, visualizationUnavailable(errorMessage))
    })

    it('does not modify the current visualization', () => {
      expect(newState.visualization).toEqual(previousVisualization)
    })

    it('sets `loading` state to false', () => {
      expect(newState.loading).toBeFalsy()
    })

    it('sets `error` state to true', () => {
      expect(newState.error).toBeTruthy()
    })
  })

  describe('RESET_VISUALIZATIION', () => {
    beforeEach(() => {
      previousState = {
        visualization: { id: 'existing' },
        loading: true,
        error: true
      }
      newState = reducer(previousState, resetVisualization())
    })

    it('sets `visualization` state to an empty object', () => {
      expect(newState.visualization).toEqual({})
    })

    it('sets `loading` state to false', () => {
      expect(newState.loading).toBeFalsy()
    })

    it('sets `error` state to false', () => {
      expect(newState.error).toBeFalsy()
    })
  })
})