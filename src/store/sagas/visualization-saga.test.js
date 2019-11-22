import { visualizationSave, visualizationUpdate, visualizationLoadFailure, visualizationSaveFailure, visualizationLoad, visualizationLoadSuccess, visualizationSaveSuccess, setQueryText } from '../actions'
import visualizationSaga from './visualization-saga'
import { saveVisualization, updateVisualization } from './visualization-saga'
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

  describe('getVisualization', () => {
    const id = "hello"
    const visualization = { id }
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


  describe('createVisualization', () => {
    const id = "hello"
    const title = "my first visualization"
    const query = "select hello from world"
    const returnedVisualization = { id, title, query }
    const initialState = {
      visualization: { chart: { data: { x: [1, 2, 3], xsrc: "col1" }, layout: {}, frames: [] } },
      queryReducer: { queryData: [{ col1: 1 }, { col1: 2 }, { col1: 3 }] }
    }

    describe('successfully', () => {
      var dispatched = []
      beforeEach(async () => {
        AuthenticatedHTTPClient.post = jest.fn(() => ({ status: 200, data: returnedVisualization }))
        dispatched = await recordSaga(saveVisualization, visualizationSave(title, query), initialState)
      })

      it('calls api with parameters that include a dereferenced chart', () => {
        expect(AuthenticatedHTTPClient.post).toHaveBeenCalledWith(`/api/v1/visualization`,
          {
            title: title,
            query: query,
            chart: { data: { x: [], xsrc: "col1" }, frames: [], layout: {} } // TODO: Double check the expected x
          }
        )
      });

      it('signals the visualization is available', () => {
        expect(dispatched).toContainEqual(visualizationSaveSuccess(returnedVisualization))
      })
    })

    describe('with a non-success status code', () => {
      const nonSuccessStatusCode = 400
      var dispatched = []
      beforeEach(async () => {
        AuthenticatedHTTPClient.post = jest.fn(() => ({ status: nonSuccessStatusCode }))
        dispatched = await recordSaga(saveVisualization, visualizationSave(title, query), initialState)
      })

      it('signals the visualization is unavailable', () => {
        expect(dispatched).toContainEqual(visualizationSaveFailure(nonSuccessStatusCode))
      })
    })

    describe('with a thrown error', () => {
      const errorMessage = 'WRONG'
      var dispatched = []
      beforeEach(async () => {
        AuthenticatedHTTPClient.post = jest.fn(() => { throw new Error(errorMessage) })
        dispatched = await recordSaga(saveVisualization, visualizationSave(title, query), initialState)
      })

      it('signals the visualization is unavailable', () => {
        expect(dispatched).toContainEqual(visualizationSaveFailure(errorMessage))
      })
    })

  })


  describe('updateVisualization', () => {
    const id = "hello"
    const title = "my first visualization"
    const query = "select hello from world"
    const returnedVisualization = { id, title, query }
    const initialState = {
      visualization: { chart: { data: { x: [1, 2, 3], xsrc: "col1" }, layout: {}, frames: [] } },
      queryReducer: { queryData: [{ col1: 1 }, { col1: 2 }, { col1: 3 }] }
    }

    describe('successfully', () => {
      var dispatched = []
      beforeEach(async () => {
        AuthenticatedHTTPClient.put = jest.fn(() => ({ status: 200, data: returnedVisualization }))
        dispatched = await recordSaga(updateVisualization, visualizationUpdate(id, title, query), initialState)
      })

      it('calls api with parameters that include a dereferenced chart', () => {
        expect(AuthenticatedHTTPClient.put).toHaveBeenCalledWith(`/api/v1/visualization/${id}`,
          {
            id: id,
            title: title,
            query: query,
            chart: { data: { x: [], xsrc: "col1" }, frames: [], layout: {} } // TODO: Double check the expected x
          }
        )
      });

      it('signals the visualization is available', () => {
        expect(dispatched).toContainEqual(visualizationSaveSuccess(returnedVisualization))
      })
    })

    describe('with a non-success status code', () => {
      const nonSuccessStatusCode = 400
      var dispatched = []
      beforeEach(async () => {
        AuthenticatedHTTPClient.put = jest.fn(() => ({ status: nonSuccessStatusCode }))
        dispatched = await recordSaga(updateVisualization, visualizationUpdate(title, query), initialState)
      })

      it('signals the visualization is unavailable', () => {
        expect(dispatched).toContainEqual(visualizationSaveFailure(nonSuccessStatusCode))
      })
    })

    describe('with a thrown error', () => {
      const errorMessage = 'WRONG'
      var dispatched = []
      beforeEach(async () => {
        AuthenticatedHTTPClient.put = jest.fn(() => { throw new Error(errorMessage) })
        dispatched = await recordSaga(updateVisualization, visualizationUpdate(title, query), initialState)
      })

      it('signals the visualization is unavailable', () => {
        expect(dispatched).toContainEqual(visualizationSaveFailure(errorMessage))
      })
    })
  })

})

async function recordSaga(saga, initialAction, initialState) {
  const dispatched = [];

  await runSaga(
    {
      dispatch: (action) => dispatched.push(action),
      getState: () => (initialState)
    },
    saga,
    initialAction
  ).done;

  return dispatched;
}
