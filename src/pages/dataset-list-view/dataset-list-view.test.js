import { shallow } from 'enzyme'
import DatasetListView from './dataset-list-view'
import Paginator from '../../components/generic-elements/paginator'
import Select from '../../components/generic-elements/select'
import Search from '../../components/generic-elements/search'
import FacetSidebar from '../../components/facet-sidebar'

describe('dataset list view', () => {
  let expectedDatasetList, retrieveSpy, navigationSpy, subject

  beforeEach(() => {
    expectedDatasetList = Array.from(Array(6)).map((unused, index) => ({ id: index }))
    retrieveSpy = jest.fn()
    navigationSpy = jest.fn()
    subject = shallow(<DatasetListView datasets={expectedDatasetList} totalDatasets={12} retrieveDataset={retrieveSpy} history={{ push: navigationSpy }} location={{ search: '?q=monkey&sort=default' }} />)
  })

  describe('fetching data', () => {
    it('fetches data on mount with page number 1 and default page size', () => {
      expect(retrieveSpy).toHaveBeenCalledWith({ page: 1, pageSize: 10, sort: 'default', query: 'monkey' })
    })

    it('fetches data with specified query parameters when props are updated', () => {
      subject.setProps({ location: { search: '?q=newsearch&sort=name_desc' } })

      expect(retrieveSpy).toHaveBeenCalledWith({ page: 1, pageSize: 10, sort: 'name_desc', query: 'newsearch' })
    })

    it('fetches data with the new page number and specified query parameters when the page is changed', () => {
      subject.find(Paginator).props().pageChangeCallback(4)

      expect(retrieveSpy).toHaveBeenCalledWith({ page: 4, pageSize: 10, sort: 'default', query: 'monkey' })
    })
  })

  it('informs the paginator of the current page when the paginator invokes the callback', () => {
    subject.find(Paginator).props().pageChangeCallback(2)

    expect(subject.find(Paginator).props().currentPage).toEqual(2)
  })

  it('sets paginator total page count based on total datasets and page size', () => {
    const expectedNumberOfPages = 2 // 12 datasets with page size of 10
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

  it('resets the page number to 1 on sort change', () => {
    subject.find(Paginator).props().pageChangeCallback(2)
    subject.find(Select).props().selectChangeCallback('stuff')

    expect(subject.find(Paginator).props().currentPage).toEqual(1)
  })

  it('resets the page number to 1 on search change', () => {
    subject.find(Paginator).props().pageChangeCallback(2)
    subject.find(Search).props().callback('new search')

    expect(subject.find(Paginator).props().currentPage).toEqual(1)
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

  it('adds additional facets to query string when a new facet is clicked', () => {
    subject.setProps({ location: { search: encodeURI('?q=newsearch&sort=name_desc&facets[organization][]=stuff') } })
    subject.find(FacetSidebar).props().clickHandler('organization', 'things')

    expect(navigationSpy).toHaveBeenCalledWith({
      search: encodeURI('q=newsearch&sort=name_desc&facets[organization][]=stuff&facets[organization][]=things')
    })
  })

  it('removes facets in query string when a lone facet is toggled', () => {
    subject.setProps({ location: { search: encodeURI('?q=newsearch&sort=name_desc&facets[organization][]=stuff') } })
    subject.find(FacetSidebar).props().clickHandler('organization', 'stuff')

    expect(navigationSpy).toHaveBeenCalledWith({
      search: encodeURI('q=newsearch&sort=name_desc')
    })
  })

  it('toggles facets in query string when facet is clicked and other facets exist', () => {
    subject.setProps({ location: { search: encodeURI('?q=newsearch&sort=name_desc&facets[organization][]=stuff&facets[foo][]=bar') } })
    subject.find(FacetSidebar).props().clickHandler('organization', 'stuff')

    expect(navigationSpy).toHaveBeenCalledWith({
      search: encodeURI('q=newsearch&sort=name_desc&facets[foo][]=bar')
    })
  })
})
