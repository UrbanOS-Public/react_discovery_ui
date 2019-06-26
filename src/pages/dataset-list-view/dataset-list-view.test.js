import { shallow } from 'enzyme'
import DatasetListView from './dataset-list-view'
import Paginator from '../../components/generic-elements/paginator'
import Select from '../../components/generic-elements/select'
import Search from '../../components/generic-elements/search'
import ErrorComponent from '../../components/generic-elements/error-component'
import LoadingElement from '../../components/generic-elements/loading-element'
import FacetSidebar from '../../components/facet-sidebar'

describe('dataset list view', () => {
  let expectedDatasetList, retrieveSpy, navigationSpy, fetchData, subject

  beforeEach(() => {
    expectedDatasetList = Array.from(Array(6)).map((unused, index) => ({ id: index }))
    retrieveSpy = jest.fn()
    navigationSpy = jest.fn()
    fetchData = jest.fn()
    subject =
      shallow(<DatasetListView
        datasets={[]}
        facets={[]}
        totalDatasets={12}
        error={false}
        loading={false}
        history={{ push: navigationSpy }}
        fetchData={fetchData}
        location={{ search: '?q=monkey&sort=default' }}
      />)
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

  it('shows error message when the error property is true', () => {
    subject = shallow(<DatasetListView
      history={{ push: navigationSpy }}
      location={{ search: '' }}
      error={true}
    />)

    expect(subject.find(ErrorComponent)).toHaveLength(1)
  })

  it('shows a loading spinner when the loading property is true', () => {
    subject = shallow(<DatasetListView
      history={{ push: navigationSpy }}
      location={{ search: '' }}
      loading={true} />)

    expect(subject.find(LoadingElement)).toHaveLength(1)
  })
})
