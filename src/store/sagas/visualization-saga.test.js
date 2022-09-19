import { visualizationSave, visualizationLoadFailure, visualizationSaveFailure, visualizationLoad, visualizationLoadSuccess, visualizationsLoadAll, visualizationsLoadAllSuccess, visualizationsLoadAllFailure, visualizationSaveSuccess, setQueryText, setChartInformation, executeFreestyleQuery, visualizationDelete, visualizationDeleteFailure, visualizationDeleteSuccess, retrieveDatasetReference } from '../actions'
import visualizationSaga, { saveVisualization, deleteVisualization, loadDatasetReferences } from './visualization-saga'

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { runSaga } from 'redux-saga'
import { AuthenticatedHTTPClient } from '../../utils/http-clients'

describe('visualization-saga', () => {
  let store
  let sagaMiddleware
  const reducer = (state = [], action) => {
    return [...state, action]
  }

  beforeEach(() => {
    sagaMiddleware = createSagaMiddleware()
    store = createStore(reducer, applyMiddleware(sagaMiddleware))
    sagaMiddleware.run(visualizationSaga)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('loadVisualization', () => {
    const id = 'hello'
    const chart = { data: [], frames: [], layout: {} }
    const query = 'select * from stuff'
    const usedDatasets = ['123', '432']
    const visualization = { id, chart, query, usedDatasets }
    describe('successfully', () => {
      beforeEach(() => {
        AuthenticatedHTTPClient.get = jest.fn(() => ({ status: 200, data: visualization }))
        store.dispatch(visualizationLoad(id))
      })

      it('calls the correct API endpoint', () => {
        expect(AuthenticatedHTTPClient.get).toHaveBeenCalledWith(`/api/v1/visualization/${id}`)
      })

      it('signals the visualization is available', () => {
        expect(store.getState()).toContainEqual(visualizationLoadSuccess(visualization))
      })

      it('sets the global chart data', () => {
        expect(store.getState()).toContainEqual(setChartInformation(visualization.chart))
      })

      it('sets the global query text', () => {
        expect(store.getState()).toContainEqual(setQueryText(visualization.query))
      })

      it('executes the query', () => {
        expect(store.getState()).toContainEqual(executeFreestyleQuery(visualization.query))
      })
    })

    describe('dispatches side effects', () => {
      let dispatched
      beforeEach(async () => {
        AuthenticatedHTTPClient.get = jest.fn(() => ({ status: 200 }))
        dispatched = await recordSaga(loadDatasetReferences, visualizationLoadSuccess(visualization), { datasetReferences: {} })
      })

      it('sends a get reference action per dataset', () => {
        expect(dispatched).toContainEqual(retrieveDatasetReference(usedDatasets[0]))
        expect(dispatched).toContainEqual(retrieveDatasetReference(usedDatasets[1]))
      })
    })

    describe('with a non-success status code', () => {
      const nonSuccessStatusCode = 400
      beforeEach(() => {
        AuthenticatedHTTPClient.get = jest.fn(() => ({ status: nonSuccessStatusCode }))
      })

      it('signals the visualization is unavailable', () => {
        store.dispatch(visualizationLoad(id))

        expect(store.getState()).toContainEqual(visualizationLoadFailure(nonSuccessStatusCode))
      })
    })

    describe('with a thrown error', () => {
      const errorMessage = 'WRONG'
      beforeEach(() => {
        AuthenticatedHTTPClient.get = jest.fn(() => { throw new Error(errorMessage) })
      })

      it('signals the visualization is unavailable', () => {
        store.dispatch(visualizationLoad(id))

        expect(store.getState()).toContainEqual(visualizationLoadFailure(errorMessage))
      })
    })
  })

  describe('loadUserVisualizations', () => {
    const visualizations = [{ title: 'title1', id: 'id1' }, { title: 'title2', id: 'id2' }]

    describe('successfully', () => {
      beforeEach(() => {
        AuthenticatedHTTPClient.get = jest.fn(() => ({ status: 200, data: visualizations }))
        store.dispatch(visualizationsLoadAll())
      })

      it('calls the correct API endpoint', () => {
        expect(AuthenticatedHTTPClient.get).toHaveBeenCalledWith('/api/v1/visualization')
      })

      it('signals the visualization is available', () => {
        expect(store.getState()).toContainEqual(visualizationsLoadAllSuccess(visualizations))
      })
    })

    describe('with a non-successful status code', () => {
      beforeEach(() => {
        AuthenticatedHTTPClient.get = jest.fn(() => ({ status: 400 }))
        store.dispatch(visualizationsLoadAll())
      })

      it('signals the visualizations are unavailable', () => {
        expect(store.getState()).toContainEqual(visualizationsLoadAllFailure(400))
      })
    })

    describe('with a thrown error', () => {
      const errorMessage = 'WRONG AGAIN'
      beforeEach(() => {
        AuthenticatedHTTPClient.get = jest.fn(() => { throw new Error(errorMessage) })
        store.dispatch(visualizationsLoadAll())
      })

      it('signals the visualization is unavailable', () => {
        expect(store.getState()).toContainEqual(visualizationsLoadAllFailure(errorMessage))
      })
    })
  })

  describe('saveVisualization', () => {
    describe('without an id', () => {
      const title = 'my first visualization'
      const query = 'select hello from world'
      const usedDatasets = ['123', '432']
      const returnedVisualization = { id: 'generated id from api', title, query, usedDatasets }
      const initialState = {
        visualization: { chart: { data: [{ x: [1, 2, 3], xsrc: 'col1' }], layout: {}, frames: [] } },
        queryReducer: { queryData: [{ col1: 1 }, { col1: 2 }, { col1: 3 }] }
      }

      describe('successfully', () => {
        let dispatched = []
        beforeEach(async () => {
          AuthenticatedHTTPClient.post = jest.fn(() => ({ status: 200, data: returnedVisualization }))
          dispatched = await recordSaga(saveVisualization, visualizationSave({ title, query }), initialState)
        })

        it('calls api with parameters that include a dereferenced chart', () => {
          expect(AuthenticatedHTTPClient.post).toHaveBeenCalledWith('/api/v1/visualization',
            {
              title: title,
              query: query,
              chart: { data: [{ x: null, xsrc: 'col1' }], frames: [], layout: {} }
            }
          )
        })

        it('signals the visualization is available', () => {
          expect(dispatched).toContainEqual(visualizationSaveSuccess(returnedVisualization))
        })

        it('does not set the global chart data', () => {
          expect(dispatched).not.toContainEqual(setChartInformation(returnedVisualization.chart))
        })

        it('does not set the global query text', () => {
          expect(dispatched).not.toContainEqual(setQueryText(returnedVisualization.query))
        })
      })

      describe('dispatches side effects', () => {
        let dispatched = []
        beforeEach(async () => {
          AuthenticatedHTTPClient.get = jest.fn(() => ({ status: 200 }))
          dispatched = await recordSaga(loadDatasetReferences, visualizationSaveSuccess(returnedVisualization), { datasetReferences: {} })
        })

        it('sends a get reference action per dataset', () => {
          expect(dispatched).toContainEqual(retrieveDatasetReference(usedDatasets[0]))
          expect(dispatched).toContainEqual(retrieveDatasetReference(usedDatasets[1]))
        })
      })

      describe('with a non-success status code', () => {
        const nonSuccessStatusCode = 400
        let dispatched = []
        beforeEach(async () => {
          AuthenticatedHTTPClient.post = jest.fn(() => ({ status: nonSuccessStatusCode }))
          dispatched = await recordSaga(saveVisualization, visualizationSave({ title, query }), initialState)
        })

        it('signals the visualization is unavailable', () => {
          expect(dispatched).toContainEqual(visualizationSaveFailure(nonSuccessStatusCode))
        })
      })

      describe('with a thrown error', () => {
        const errorMessage = 'WRONG'
        let dispatched = []
        beforeEach(async () => {
          AuthenticatedHTTPClient.post = jest.fn(() => { throw new Error(errorMessage) })
          dispatched = await recordSaga(saveVisualization, visualizationSave({ title, query }), initialState)
        })

        it('signals the visualization is unavailable', () => {
          expect(dispatched).toContainEqual(visualizationSaveFailure(errorMessage))
        })
      })
    })

    describe('with an id', () => {
      const id = 'hello'
      const title = 'my first visualization'
      const query = 'select hello from world'
      const returnedVisualization = { id, title, query }
      const initialState = {
        visualization: { chart: { data: [{ x: [1, 2, 3], xsrc: 'col1' }], layout: {}, frames: [] } },
        queryReducer: { queryData: [{ col1: 1 }, { col1: 2 }, { col1: 3 }] }
      }

      describe('successfully', () => {
        let dispatched = []
        beforeEach(async () => {
          AuthenticatedHTTPClient.put = jest.fn(() => ({ status: 200, data: returnedVisualization }))
          dispatched = await recordSaga(saveVisualization, visualizationSave({ id, title, query }), initialState)
        })

        it('calls api with parameters that include a dereferenced chart', () => {
          expect(AuthenticatedHTTPClient.put).toHaveBeenCalledWith(`/api/v1/visualization/${id}`,
            {
              id: id,
              title: title,
              query: query,
              chart: { data: [{ x: null, xsrc: 'col1' }], frames: [], layout: {} }
            }
          )
        })

        it('signals the visualization is available', () => {
          expect(dispatched).toContainEqual(visualizationSaveSuccess(returnedVisualization))
        })

        it('does not set the global chart data', () => {
          expect(dispatched).not.toContainEqual(setChartInformation(returnedVisualization.chart))
        })

        it('does not set the global query text', () => {
          expect(dispatched).not.toContainEqual(setQueryText(returnedVisualization.query))
        })
      })

      describe('with a non-success status code', () => {
        const nonSuccessStatusCode = 400
        let dispatched = []
        beforeEach(async () => {
          AuthenticatedHTTPClient.put = jest.fn(() => ({ status: nonSuccessStatusCode }))
          dispatched = await recordSaga(saveVisualization, visualizationSave({ id, title, query }), initialState)
        })

        it('signals the visualization is unavailable', () => {
          expect(dispatched).toContainEqual(visualizationSaveFailure(nonSuccessStatusCode))
        })
      })

      describe('with a thrown error', () => {
        const errorMessage = 'WRONG'
        let dispatched = []
        beforeEach(async () => {
          AuthenticatedHTTPClient.put = jest.fn(() => { throw new Error(errorMessage) })
          dispatched = await recordSaga(saveVisualization, visualizationSave({ id, title, query }), initialState)
        })

        it('signals the visualization is unavailable', () => {
          expect(dispatched).toContainEqual(visualizationSaveFailure(errorMessage))
        })
      })

      describe('creating a copy', () => {
        let dispatched = []
        beforeEach(async () => {
          AuthenticatedHTTPClient.post = jest.fn(() => ({ status: 200, data: returnedVisualization }))
          dispatched = await recordSaga(saveVisualization, visualizationSave({ id, title, query, shouldCreateCopy: true }), initialState)
        })

        it('calls api with parameters that include a dereferenced chart', () => {
          expect(AuthenticatedHTTPClient.post).toHaveBeenCalledWith('/api/v1/visualization',
            {
              title: title,
              query: query,
              chart: { data: [{ x: null, xsrc: 'col1' }], frames: [], layout: {} }
            }
          )
        })

        it('signals the visualization is available', () => {
          expect(dispatched).toContainEqual(visualizationSaveSuccess(returnedVisualization))
        })

        it('does not set the global chart data', () => {
          expect(dispatched).not.toContainEqual(setChartInformation(returnedVisualization.chart))
        })

        it('does not set the global query text', () => {
          expect(dispatched).not.toContainEqual(setQueryText(returnedVisualization.query))
        })
      })
    })
  })

  describe('deleteVisualization', () => {
    const initialState = {}

    describe('successfully', () => {
      let dispatched = []
      beforeEach(async () => {
        AuthenticatedHTTPClient.delete = jest.fn(() => ({ status: 204, data: {} }))
        dispatched = await recordSaga(deleteVisualization, visualizationDelete({ id: '3' }), initialState)
      })

      it('signals the visualization is deleted', () => {
        expect(dispatched).toContainEqual(visualizationDeleteSuccess())
      })

      it('dispatches a load user visualization list action', () => {
        expect(dispatched).toContainEqual(visualizationsLoadAll())
      })
    })

    describe('with a non-success status code', () => {
      const nonSuccessStatusCode = 400
      let dispatched = []
      beforeEach(async () => {
        AuthenticatedHTTPClient.delete = jest.fn(() => ({ status: nonSuccessStatusCode }))
        dispatched = await recordSaga(deleteVisualization, visualizationDelete({ id: '2' }), initialState)
      })

      it('signals the visualization deletion failed', () => {
        expect(dispatched).toContainEqual(visualizationDeleteFailure(nonSuccessStatusCode))
      })

      it('dispatches a load user visualization list action', () => {
        expect(dispatched).toContainEqual(visualizationsLoadAll())
      })
    })

    describe('with a thrown error', () => {
      const errorMessage = 'WRONG'
      let dispatched = []
      beforeEach(async () => {
        AuthenticatedHTTPClient.delete = jest.fn(() => { throw new Error(errorMessage) })
        dispatched = await recordSaga(deleteVisualization, visualizationDelete({ id: '1' }), initialState)
      })

      it('signals the visualization deletion failed', () => {
        expect(dispatched).toContainEqual(visualizationDeleteFailure(errorMessage))
      })

      it('dispatches a load user visualization list action', () => {
        expect(dispatched).toContainEqual(visualizationsLoadAll())
      })
    })
  })
})

async function recordSaga (saga, initialAction, initialState) {
  const dispatched = []

  await runSaga(
    {
      dispatch: (action) => dispatched.push(action),
      getState: () => (initialState)
    },
    saga,
    initialAction
  ).done

  return dispatched
}
