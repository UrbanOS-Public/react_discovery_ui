import reducer from './visualization-reducer'
import {
  visualizationFetch,
  visualizationCreate,
  visualizationAvailable,
  visualizationUnavailable,
  resetVisualization,
  visualizationFetchFailure,
  visualizationCreateFailure,
  visualizationCreateSuccess,
  visualizationFetchSuccess
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
      newState = reducer(previousState, visualizationFetch("viz_id"))
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
        loading: true,
        saving: false,
        error: true
      }
      newState = reducer(previousState, visualizationCreate("hello", "world"))
    })

    it('sets `saving` state to true', () => {
      expect(newState.saving).toBeTruthy()
    })

    it('does not modify other properties', () => {
      const { saving: _c, ...previousOthers } = previousState
      const { saving: _n, ...newOthers } = newState
      expect(newOthers).toEqual(previousOthers)
    })
  })

  describe('VISUALIZATION_CREATE_SUCCESS', () => {
    const newVisualization = { id: 'new' }
    beforeEach(() => {
      previousState = {
        visualization: { id: 'existing' },
        loading: true,
        error: true
      }
      newState = reducer(previousState, visualizationCreateSuccess(newVisualization))
    })

    it('sets `visualization` state to the visualization', () => {
      expect(newState.visualization).toEqual(newVisualization)
    })

    it('sets `saving` state to false', () => {
      expect(newState.saving).toBeFalsy()
    })

    it('sets `error` state to false', () => {
      expect(newState.error).toBeFalsy()
    })
  })

  describe('VISUALIZATION_FETCH_SUCCESS', () => {
    const newVisualization = { id: 'new' }
    beforeEach(() => {
      previousState = {
        visualization: { id: 'existing' },
        loading: true,
        error: true
      }
      newState = reducer(previousState, visualizationFetchSuccess(newVisualization))
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

  describe('VISUALIZATION_CREATE_FAILURE', () => {
    const errorMessage = 'bad stuff'
    const previousVisualization = { id: 'existing' }

    beforeEach(() => {
      previousState = {
        visualization: previousVisualization,
        loading: true,
        error: false
      }
      newState = reducer(previousState, visualizationCreateFailure(errorMessage))
    })

    it('does not modify the current visualization', () => {
      expect(newState.visualization).toEqual(previousVisualization)
    })

    it('sets `saving` state to false', () => {
      expect(newState.saving).toBeFalsy()
    })

    it('sets `error` state to true', () => {
      expect(newState.error).toBeTruthy()
    })
  })

  describe('VISUALIZATION_FETCH_FAILURE', () => {
    const errorMessage = 'bad stuff'
    const previousVisualization = { id: 'existing' }

    beforeEach(() => {
      previousState = {
        visualization: previousVisualization,
        loading: true,
        error: false
      }
      newState = reducer(previousState, visualizationFetchFailure(errorMessage))
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