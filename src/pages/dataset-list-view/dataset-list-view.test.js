import { shallow } from 'enzyme'
import DatasetListView from './dataset-list-view'
import Paginator from '../../components/generic-elements/paginator'
import Select from '../../components/generic-elements/select'
import Search from '../../components/generic-elements/search'
import mockAxios from 'axios'
import ErrorComponent from '../../components/generic-elements/error-component'
import LoadingElement from '../../components/generic-elements/loading-element'
import FacetSidebar from '../../components/facet-sidebar'

describe('dataset list view', () => {
  let expectedDatasetList, retrieveSpy, navigationSpy, subject

  beforeEach(() => {
    expectedDatasetList = Array.from(Array(6)).map((unused, index) => ({ id: index }))
    retrieveSpy = jest.fn()
    navigationSpy = jest.fn()
    subject = shallow(<DatasetListView history={{ push: navigationSpy }} location={{ search: '?q=monkey&sort=default' }} />)
  })

  describe('fetching data', () => {
    it('fetches data on mount with page number 1 and default page size', () => {
      expect(mockAxios.get).toHaveBeenCalledWith('/api/v1/dataset/search', {
        baseURL: undefined,
        params: { facets: undefined, offset: 0, pageSize: 10, sort: 'default', query: 'monkey' },
        paramsSerializer: expect.any(Function),
        withCredentials: true
      })
    })

    it('fetches data with specified query parameters when props are updated', () => {
      subject.setProps({ location: { search: '?q=newsearch&sort=name_desc' } })

      expect(mockAxios.get).toHaveBeenCalledWith('/api/v1/dataset/search', {
        baseURL: undefined,
        params: { facets: undefined, offset: 0, pageSize: 10, sort: 'name_desc', query: 'newsearch' },
        paramsSerializer: expect.any(Function),
        withCredentials: true
      })
    })

    it('fetches data with the new page number and specified query parameters when the page is changed', () => {
      subject.instance().onPageChange(4)

      expect(mockAxios.get).toHaveBeenCalledWith('/api/v1/dataset/search', {
        baseURL: undefined,
        params: { facets: undefined, offset: 30, pageSize: 10, sort: 'default', query: 'monkey' },
        paramsSerializer: expect.any(Function),
        withCredentials: true
      })
    })
  })

  it('sets paginator total page count based on total datasets and page size', () => {
    const expectedNumberOfPages = 2 // 12 datasets with page size of 10
    expect(subject.find(Paginator)).toHaveLength(1)
    expect(subject.find(Paginator).props().numberOfPages).toEqual(expectedNumberOfPages)
  })

  it('adds search parameters when the search callback is invoked', () => {
    subject.find(Search).props().callback('my search criteria')

    expect(navigationSpy).toHaveBeenCalledWith({
      search: 'q=my%20search%20criteria&sort=default'
    })
  })

  it('adds search parameters when the sort callback is invoked', () => {
    subject.find(Select).props().selectChangeCallback('stuff')

    expect(navigationSpy).toHaveBeenCalledWith({
      search: 'q=monkey&sort=stuff'
    })
  })

  it('resets the page number to 1 on sort change', done => {
    subject.find(Paginator).props().pageChangeCallback(2)

    setTimeout(function () {
      subject.find(Select).props().selectChangeCallback('stuff')
      expect(subject.find(Paginator).props().currentPage).toEqual(1)
      done()
    }, 10)
  })

  it('resets the page number to 1 on search change', done => {
    subject.find(Paginator).props().pageChangeCallback(2)

    setTimeout(function () {
      subject.find(Search).props().callback('new search')
      expect(subject.find(Paginator).props().currentPage).toEqual(1)
      done()
    }, 10)
  })

  it('does not show the search box while the page is loading, to help with resetting the search criteria on data change', () => {
    subject = shallow(<DatasetListView loading datasets={expectedDatasetList} totalDatasets={12} retrieveDataset={jest.fn()} history={{ push: navigationSpy }} location={{ search: '' }} />)

    expect(subject.find(Search).length).toEqual(0)
  })

  it('adds facets to query string when facet is clicked', () => {
    subject.find(FacetSidebar).props().clickHandler('organization', 'stuff')

    expect(navigationSpy).toHaveBeenCalledWith({
      search: encodeURI('q=monkey&sort=default&facets[organization][]=stuff')
    })
  })

  it('adds additional facets to query string when a new facet is clicked', done => {
    subject.setProps({ location: { search: encodeURI('?q=newsearch&sort=name_desc&facets[organization][]=stuff') } })

    setTimeout(function () {
      subject.find(FacetSidebar).props().clickHandler('organization', 'things')
      expect(navigationSpy).toHaveBeenCalledWith({
        search: encodeURI('q=newsearch&sort=name_desc&facets[organization][]=stuff&facets[organization][]=things')
      })
      done()
    }, 10)
  })

  it('removes facets in query string when a lone facet is toggled', done => {
    subject.setProps({ location: { search: encodeURI('?q=newsearch&sort=name_desc&facets[organization][]=stuff') } })

    setTimeout(function () {
      subject.find(FacetSidebar).props().clickHandler('organization', 'stuff')
      expect(navigationSpy).toHaveBeenCalledWith({
        search: encodeURI('q=newsearch&sort=name_desc')
      })
      done()
    }, 10)
  })

  it('toggles facets in query string when facet is clicked and other facets exist', done => {
    subject.setProps({ location: { search: encodeURI('?q=newsearch&sort=name_desc&facets[organization][]=stuff&facets[foo][]=bar') } })

    setTimeout(function () {
      subject.find(FacetSidebar).props().clickHandler('organization', 'stuff')
      expect(navigationSpy).toHaveBeenCalledWith({
        search: encodeURI('q=newsearch&sort=name_desc&facets[foo][]=bar')
      })
      done()
    }, 10)
  })

  it('shows error message when failing to retrieve dataset', done => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve({ status: 500 }))
    subject = shallow(<DatasetListView history={{ push: navigationSpy }} location={{ search: '' }} />)

    setTimeout(function () {
      expect(subject.find(ErrorComponent)).toHaveLength(1)
      done()
    }, 100)
  })

  it('shows a loading spinner before data is returned', done => {
    // A promise that never resolves
    mockAxios.get.mockImplementationOnce(() => new Promise(function (resolve, reject) {
      [{ resolve: resolve, reject: reject }]
    }))
    subject = shallow(<DatasetListView history={{ push: navigationSpy }} location={{ search: '' }} />)

    setTimeout(function () {
      expect(subject.instance().state.loading).toEqual(true)
      expect(subject.find(LoadingElement)).toHaveLength(1)
      done()
    }, 10)
  })
})
