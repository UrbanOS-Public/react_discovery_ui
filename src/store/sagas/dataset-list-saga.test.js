import {
  datasetSearch
} from '../actions'
import theRealDatasetSaga  from './dataset-list-saga'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { AuthenticatedHTTPClient } from '../../utils/http-clients'

const setUpSagaMiddleware = reducer => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(reducer, applyMiddleware(sagaMiddleware))
  sagaMiddleware.run(theRealDatasetSaga)

  return store
}

describe('dataset-list-saga', () => {
  describe('success', () => {
    it('calls api with query', () => {
      AuthenticatedHTTPClient.get = jest.fn()

      const actionTrackingReducer = (state = [], action) => {
        return [...state, action]
      }

      const queryData = {
        results: "my-results"
      }

      const response = {
        status: 200,
        data: queryData
      }

      window.API_HOST = 'http://example.com/'
      AuthenticatedHTTPClient.get.mockImplementationOnce(() => (response))
      const store = setUpSagaMiddleware(actionTrackingReducer)

      const params = {
        apiAccessible: true,
        page: 1,
        facets: {organization: ['my-org']},
        searchText: 'mcsearchin',
        sortOrder: 'name_asc'
      }

      store.dispatch(datasetSearch(params))

      const expectedParams = {
        facets: {
          organization: [
            'my-org',
          ],
        },
        limit: 10,
        offset: 0,
        query: 'mcsearchin',
        sort: 'name_asc',
        apiAccessible: true
      }

      expect(AuthenticatedHTTPClient.get).toHaveBeenCalledWith(
        '/api/v2/dataset/search',
        expect.objectContaining({
          baseURL: window.API_HOST,
          params: expectedParams,
          withCredentials: true
        })
      )
    })
  })
})
