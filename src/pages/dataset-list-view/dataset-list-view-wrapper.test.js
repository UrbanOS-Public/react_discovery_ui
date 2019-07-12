import { shallow } from 'enzyme'
import DatasetListViewWrapper from './dataset-list-view-wrapper.js'
import mockAxios from 'axios'

describe('dataset list view', () => {
  let expectedDatasetList, retrieveSpy, navigationSpy, subject

  beforeEach(() => {
    expectedDatasetList = Array.from(Array(6)).map((unused, index) => ({ id: index }))
    retrieveSpy = jest.fn()
    navigationSpy = jest.fn()
    subject = shallow(<DatasetListViewWrapper history={{ push: navigationSpy }} location={{ search: '?q=monkey&sort=default' }} />)
  })

  describe('fetching data', () => {
    it('fetches data with specified query parameters', () => {
      subject.instance().fetchData(2, 10, "name_desc", "newsearch", [{ "keyword": "bob" }], true)

      expect(mockAxios.get).toHaveBeenCalledWith('/api/v1/dataset/search', {
        baseURL: undefined,
        params: {
          facets: [{ "keyword": "bob" }],
          offset: 10,
          sort: 'name_desc',
          query: 'newsearch',
          limit: 10,
          apiAccessible: "true"
        },
        paramsSerializer: expect.any(Function),
        withCredentials: true
      })
    })
  })
})
