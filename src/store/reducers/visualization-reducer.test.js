import reducer from './visualization-reducer'
import { Link } from 'react-router-dom'
import {
  visualizationLoad,
  visualizationSave,
  visualizationReset,
  visualizationLoadSuccess,
  visualizationLoadFailure,
  visualizationSaveFailure,
  visualizationSaveSuccess,
  setChartInformation,
  visualizationsLoadAll,
  visualizationsLoadAllSuccess,
  visualizationsLoadAllFailure,
  visualizationDelete,
  visualizationDeleteFailure,
  visualizationDeleteSuccess
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
      newState = reducer(previousState, visualizationLoad('viz_id'))
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
      newState = reducer(previousState, visualizationSave('hello', 'world'))
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

  describe('VISUALIZATION_LOAD_ALL', () => {
    const newVisualizations = [{ title: 'title1', id: 'id1' }, { title: 'title2', id: 'id2' }]
    beforeEach(() => {
      previousState = {
        loading: false,
        loadSuccess: true,
        loadFailure: false
      }
      newState = reducer(previousState, visualizationsLoadAll(newVisualizations))
    })

    it('sets loading to true', () => {
      expect(newState.loading).toBeTruthy()
    })

    it('sets loadSuccess to false', () => {
      expect(newState.loadSuccess).toBeFalsy()
    })

    it('sets loadFailure to false', () => {
      expect(newState.loadFailure).toBeFalsy()
    })
  })

  describe('VISUALIZATION_LOAD_ALL_SUCCESS', () => {
    const newVisualizations = [
      { title: 'title1', id: 'id1', created: '2019-12-12T14:33:08', updated: '2019-12-12T14:33:08' },
      { title: 'title2', id: 'id2', created: '2019-12-09T15:40:15', updated: '2019-12-12T15:53:54' }
    ]

    beforeEach(() => {
      previousState = {

        loading: false,
        loadSuccess: true,
        loadFailure: false
      }
      newState = reducer(previousState, visualizationsLoadAllSuccess(newVisualizations))
    })

    it('sets loading to false', () => {
      expect(newState.loading).toBeFalsy()
    })

    it('sets loadSuccess to true', () => {
      expect(newState.loadSuccess).toBeTruthy()
    })

    it('sets loadFailure to false', () => {
      expect(newState.loadFailure).toBeFalsy()
    })

    it('provides a link to each saved visualization in the title field', () => {
      expect(newState.userVisualizations[0].title).toEqual(<Link to='/visualization/id1'>title1</Link>)
      expect(newState.userVisualizations[1].title).toEqual(<Link to='/visualization/id2'>title2</Link>)
    })
  })

  describe('VISUALIZATION_LOAD_ALL_FAILURE', () => {
    const newVisualizations = [
      { title: 'title1', id: 'id1', created: '2019-12-12T14:33:08', updated: '2019-12-12T14:33:08' },
      { title: 'title2', id: 'id2', created: '2019-12-09T15:40:15', updated: '2019-12-12T15:53:54' }
    ]

    beforeEach(() => {
      previousState = {
        loading: false,
        loadSuccess: true,
        loadFailure: false
      }
      newState = reducer(previousState, visualizationsLoadAllFailure())
    })

    it('sets loading to false', () => {
      expect(newState.loading).toBeFalsy()
    })

    it('sets loadSuccess to false', () => {
      expect(newState.loadSuccess).toBeFalsy()
    })

    it('sets loadFailure to true', () => {
      expect(newState.loadFailure).toBeTruthy()
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
      newState = reducer(previousState, setChartInformation({ data: [{ x: 1 }], frames: [], layout: {} }))

      expect(newState.chart).toEqual({ data: [{ x: 1 }], frames: [], layout: {} })
    })

    it('gives sane defaults to the chart properties when they are not set', () => {
      newState = reducer(previousState, setChartInformation({}))

      expect(newState.chart).toEqual({ data: [], frames: [], layout: {} })
    })

    it('gives sane defaults to the chart properties when they are set to the wrong types', () => {
      newState = reducer(previousState, setChartInformation({ data: [[]], frames: { more: 'stuff' }, layout: [] }))

      expect(newState.chart).toEqual({ data: [], frames: [], layout: {} })
    })
  })

  describe('VISUALIZATION_DELETE', () => {
    beforeEach(() => {
      previousState = {
        deleting: false,
        deleteSuccess: true,
        deleteFailure: true
      }
      newState = reducer(previousState, visualizationDelete({ id: 'Frank' }))
    })

    it('sets `deleting` state to true', () => {
      expect(newState.deleting).toBeTruthy()
    })

    it('sets `failure` state to false', () => {
      expect(newState.deleteFailure).toBeFalsy()
    })

    it('sets `success` state to false', () => {
      expect(newState.deleteSuccess).toBeFalsy()
    })
  })

  describe('VISUALIZATION_DELETE_SUCCESS', () => {
    beforeEach(() => {
      previousState = {
        deleting: true,
        deleteSuccess: false,
        deleteFailure: false
      }
      newState = reducer(previousState, visualizationDeleteSuccess())
    })

    it('sets `deleting` state to false', () => {
      expect(newState.deleting).toBeFalsy()
    })

    it('sets `success` state to true', () => {
      expect(newState.deleteSuccess).toBeTruthy()
    })
  })

  describe('VISUALIZATION_DELETE_FAILURE', () => {
    beforeEach(() => {
      previousState = {
        deleting: true,
        deleteSuccess: false,
        deleteFailure: false
      }
      newState = reducer(previousState, visualizationDeleteFailure())
    })

    it('sets `deleting` state to false', () => {
      expect(newState.deleting).toBeFalsy()
    })

    it('sets `failure` state to true', () => {
      expect(newState.deleteFailure).toBeTruthy()
    })
  })
})
