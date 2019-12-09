import reducer from './visualization-reducer'
import {
  visualizationLoad,
  visualizationSave,
  visualizationReset,
  visualizationLoadSuccess,
  visualizationLoadFailure,
  visualizationSaveFailure,
  visualizationSaveSuccess,
  setChartInformation
} from '../actions'

describe('Visualization Reducer', () => {
  let newState, previousState

  describe('VISUALIZATION_LOAD', () => {
    beforeEach(() => {
      previousState = {
        visualization: { id: 'existing' },
        loading: false,
        loadSuccess: true,
        loadFailure: true
      }
      newState = reducer(previousState, visualizationLoad("viz_id"))
    })

    it('sets `loading` state to true', () => {
      expect(newState.loading).toBeTruthy()
    })

    it('sets `loadSuccess` state to false', () => {
      expect(newState.loadSuccess).toBeFalsy()
    })

    it('sets `loadFailure` state to false', () => {
      expect(newState.loadFailure).toBeFalsy()
    })

    it('does not modify other properties', () => {
      const { loading: _cl, loadSuccess: _cs, loadFailure: _cf, ...previousOthers } = previousState
      const { loading: _nl, loadSuccess: _ns, loadFailure: _nf, ...newOthers } = newState
      expect(newOthers).toEqual(previousOthers)
    })
  })

  describe('VISUALIZATION_SAVE', () => {
    beforeEach(() => {
      previousState = {
        visualization: { id: 'existing' },
        loading: true,
        saving: false,
        saveSuccess: true,
        saveFailure: true
      }
      newState = reducer(previousState, visualizationSave("hello", "world"))
    })

    it('sets `saving` state to true', () => {
      expect(newState.saving).toBeTruthy()
    })

    it('sets `saveSuccess` state to false', () => {
      expect(newState.saveSuccess).toBeFalsy()
    })

    it('sets `saveFailure` state to false', () => {
      expect(newState.saveFailure).toBeFalsy()
    })

    it('does not modify other properties', () => {
      const { saving: _cl, saveSuccess: _cs, saveFailure: _cf, ...previousOthers } = previousState
      const { saving: _nl, saveSuccess: _ns, saveFailure: _nf, ...newOthers } = newState
      expect(newOthers).toEqual(previousOthers)
    })
  })

  describe('VISUALIZATION_SAVE_SUCCESS', () => {
    const newVisualization = { id: 'new' }
    beforeEach(() => {
      previousState = {
        visualization: { id: 'existing' },
        loading: true,
        saveSuccess: false,
        saving: true,
        saveFailure: true
      }
      newState = reducer(previousState, visualizationSaveSuccess(newVisualization))
    })

    it('sets `visualization` state to the visualization', () => {
      expect(newState.visualization).toEqual(newVisualization)
    })

    it('sets `saving` state to false', () => {
      expect(newState.saving).toBeFalsy()
    })

    it('sets `saveSuccess` state to true', () => {
      expect(newState.saveSuccess).toBeTruthy()
    })

    it('sets `saveFailure` state to false', () => {
      expect(newState.saveFailure).toBeFalsy()
    })
  })

  describe('VISUALIZATION_LOAD_SUCCESS', () => {
    const newVisualization = { id: 'new' }
    beforeEach(() => {
      previousState = {
        visualization: { id: 'existing' },
        loading: true,
        loadSuccess: true,
        loadFailure: true
      }
      newState = reducer(previousState, visualizationLoadSuccess(newVisualization))
    })

    it('sets `visualization` state to the visualization', () => {
      expect(newState.visualization).toEqual(newVisualization)
    })

    it('sets `loading` state to false', () => {
      expect(newState.loading).toBeFalsy()
    })

    it('sets `loadSuccess` state to true', () => {
      expect(newState.loadSuccess).toBeTruthy()
    })

    it('sets `loadFailure` state to false', () => {
      expect(newState.loadFailure).toBeFalsy()
    })
  })

  describe('VISUALIZATION_SAVE_FAILURE', () => {
    const errorMessage = 'bad stuff'
    const previousVisualization = { id: 'existing' }

    beforeEach(() => {
      previousState = {
        visualization: previousVisualization,
        loading: true,
        saving: true,
        saveSuccess: true,
        saveFailure: false
      }
      newState = reducer(previousState, visualizationSaveFailure(errorMessage))
    })

    it('does not modify the current visualization', () => {
      expect(newState.visualization).toEqual(previousVisualization)
    })

    it('sets `saving` state to false', () => {
      expect(newState.saving).toBeFalsy()
    })

    it('sets `saveSuccess` state to false', () => {
      expect(newState.saveSuccess).toBeFalsy()
    })

    it('sets `saveFailure` state to true', () => {
      expect(newState.saveFailure).toBeTruthy()
    })
  })

  describe('VISUALIZATION_LOAD_FAILURE', () => {
    const errorMessage = 'bad stuff'
    const previousVisualization = { id: 'existing' }

    beforeEach(() => {
      previousState = {
        visualization: previousVisualization,
        loading: true,
        loadSuccess: true,
        loadFailure: false
      }
      newState = reducer(previousState, visualizationLoadFailure(errorMessage))
    })

    it('does not modify the current visualization', () => {
      expect(newState.visualization).toEqual(previousVisualization)
    })

    it('sets `loading` state to false', () => {
      expect(newState.loading).toBeFalsy()
    })

    it('sets `loadSuccess` state to false', () => {
      expect(newState.loadSuccess).toBeFalsy()
    })

    it('sets `loadFailure` state to true', () => {
      expect(newState.loadFailure).toBeTruthy()
    })
  })

  describe('VISUALIZATION_RESET', () => {
    beforeEach(() => {
      previousState = {
        visualization: { id: 'existing' },
        loading: true,
        loadSuccess: true,
        loadFailure: true,
        saving: true,
        saveSuccess: true,
        saveFailure: true
      }
      newState = reducer(previousState, visualizationReset())
    })

    it('sets `visualization` state to an empty object', () => {
      expect(newState.visualization).toEqual({})
    })

    it('sets `loading` state to false', () => {
      expect(newState.loading).toBeFalsy()
    })

    it('sets `loadFailure` state to false', () => {
      expect(newState.loadFailure).toBeFalsy()
    })

    it('sets `loadSuccess` state to false', () => {
      expect(newState.loadSuccess).toBeFalsy()
    })

    it('sets `saving` state to false', () => {
      expect(newState.saving).toBeFalsy()
    })

    it('sets `saveFailure` state to false', () => {
      expect(newState.saveFailure).toBeFalsy()
    })

    it('sets `saveSuccess` state to false', () => {
      expect(newState.saveSuccess).toBeFalsy()
    })
  })

  describe('SET_CHART_INFORMATION', () => {
    beforeEach(() => {
      previousState = {
        visualization: { id: 'existing' },
        loading: true,
        saving: false,
        saveSuccess: true,
        saveFailure: true,
        chart: {}
      }
    })

    it('updates the chart value in the store', () => {
      newState = reducer(previousState, setChartInformation({ data: [{x: 1}], frames: [], layout: {}}))

      expect(newState.chart).toEqual({ data: [{x: 1}], frames: [], layout: {}})
    })

    it('gives sane defaults to the chart properties when they are not set', () => {
      newState = reducer(previousState, setChartInformation({}))

      expect(newState.chart).toEqual({ data: [], frames: [], layout: {}})
    })

    it('gives sane defaults to the chart properties when they are set to the wrong types', () => {
      newState = reducer(previousState, setChartInformation({ data: [[]], frames: {more: 'stuff'}, layout: []}))

      expect(newState.chart).toEqual({ data: [], frames: [], layout: {}})
    })
  })
})
