import './dataset-list-view.scss'
import { Component } from 'react'
import DatasetList from '../../components/dataset-list'
import Paginator from '../../components/generic-elements/paginator'
import Select from '../../components/generic-elements/select'
import Search from '../../components/generic-elements/search'
import LoginZone from '../../components/login-zone'
import FacetSidebar from '../../components/facet-sidebar'
import ErrorComponent from '../../components/generic-elements/error-component'
import LoadingElement from '../../components/generic-elements/loading-element'
import Checkbox from '../../components/generic-elements/checkbox'
import qs from 'qs'
import _ from 'lodash'
import { QueryStringBuilder } from '../../utils'


export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { currentPage: 1, pageSize: 10 }
  }

  componentDidMount() {
    this.props.updateDatasetSearchParams({
    })
    this.fetchData(this.props.searchParams)
    
  }

  fetchData({pageNumber, limit, sort, query, facets, apiAccessible}) {
    const offset = (pageNumber - 1) * limit
    apiAccessible = apiAccessible.toString()
    let params = { offset, limit, sort, query, facets, apiAccessible }

    this.props.datasetSearch(params)
  }

  onSearchChange(criteria) {
    this.props.updateDatasetSearchParams({
      query: criteria
    })
    this.props.datasetSearch()
  }

  onSortChange(sort) {
    this.props.updateDatasetSearchParams({
      sort: sort
    })
    this.props.datasetSearch()
  }

  onFacetClick(facetName, facetValue) {
    const updatedFacets = this.toggleFacetValue(this.props.searchParams.facets, facetName, facetValue)
    this.props.updateDatasetSearchParams({
      facets: updatedFacets
    })
    this.props.datasetSearch()
  }

  toggleFacetValue(facets, facetName, facetValue) { //Seems like this should be in redux?
    const facetValues = _.get(facets, facetName)
    return Object.assign(facets || {}, { [facetName]: _.xor(facetValues, [facetValue]) })
  }

  onRemoteToggleClick() {
    this.props.updateDatasetSearchParams({
      apiAccessible: !this.props.searchParams.apiAccessible
    })
    this.props.datasetSearch()
  }

  onPageChange(page) {
    const offset = (page - 1) * this.props.searchParams.limit
    this.props.updateDatasetSearchParams({
      offset: offset
    })
    this.props.datasetSearch()
    this.state.currentPage = page
  }

  //---old v----------new ^--------------------------

  // onPageChange(page) {
  //   this.setState({ currentPage: page })
  //   this.refreshDatasets(this.searchParams, this.sort, this.facets, page, this.apiAccessible)
  // }

  // onRemoteToggleClick() {
  //   this.refreshDatasets(this.searchParams, this.sort, this.facets, 1, !this.apiAccessible)
  // }

  // onFacetClick(facetName, facetValue) {
  //   this.setState({ currentPage: 1 })

  //   const updatedFacets = this.toggleFacetValue(facetName, facetValue)

  //   this.refreshDatasets(
  //     this.searchParams,
  //     this.sort,
  //     updatedFacets,
  //     1,
  //     this.apiAccessible
  //   )
  // }

  // onSortChange(sort) {
  //   this.setState({ currentPage: 1 })
  //   this.refreshDatasets(this.searchParams, sort, this.facets, 1, this.apiAccessible)
  // }

  // refreshDatasets(criteria, sort, facets, pageNumber, apiAccessible) {
  //   this.updateQueryParameters(criteria, sort, facets, apiAccessible)
  //   this.fetchData(pageNumber, this.state.pageSize, sort, criteria, facets, apiAccessible)
  // }

  updateQueryParameters(searchCriteria, sort, facets, apiAccessible) {
    this.props.history.push({
      search: QueryStringBuilder.createQueryString(facets, searchCriteria, sort, apiAccessible)
    })
  }

  getQueryParam(param) {
    return qs.parse(this.props.location.search, { ignoreQueryPrefix: true })[param]
  }

  get numberOfPages() {
    return Math.ceil(this.props.searchMetadata.totalDatasets / this.props.searchParams.limit)
  }

  get searchParams() {
    return this.getQueryParam("q")
  }

  get sort() {
    return this.getQueryParam("sort")
  }

  get facets() {
    return this.getQueryParam("facets")
  }

  get apiAccessible() {
    const apiAccessible = this.getQueryParam("apiAccessible")
    return this.convertStringToBooleanWithDefault(apiAccessible, false)
  }

  convertStringToBooleanWithDefault(value, defaultValue) {
    return value == undefined ? defaultValue : _.lowerCase(value) == "true"
  }

  get totalDatasets() {
    return this.props.totalDatasets
  }

  get createSortOptions() {
    return [
      { value: 'name_asc', label: 'Name Ascending', default: this.sort === 'name_asc' },
      { value: 'name_desc', label: 'Name Descending', default: this.sort === 'name_desc' },
      { value: 'last_mod', label: 'Last Modified', default: this.sort === 'last_mod' }
    ]
  }

  renderLoading() {
    return (
      <dataset-list-view>
        <LoadingElement />
      </dataset-list-view>)
  }

  render() {
    const resultCountText = `${this.props.searchMetadata.totalDatasets || 'No'} datasets found`
    const resultCountQueryText = this.props.searchParams.query ? ` for "${this.props.searchParams.query}"` : ''
    const token = sessionStorage.getItem('api-token')
    if (false) { //Fix this
      return <ErrorComponent errorText={'We were unable to fetch the datasets, please refresh the page to try again'} />
    } else if (this.props.loading) {
      return this.renderLoading()
    } else {
      return (
        <dataset-list-view ref={this.pageRef}>
          <div className='left-section'>
            <LoginZone token={token} />
            <Checkbox
              clickHandler={() => this.onRemoteToggleClick()}
              text="API Accessible"
              selected={this.props.searchParams.apiAccessible} />
            <FacetSidebar
              availableFacets={this.props.searchMetadata.facets}
              appliedFacets={this.props.searchParams.facets}
              clickHandler={(facetName, facetValue) => this.onFacetClick(facetName, facetValue)} />
          </div>
          <div className='right-section'>
            <Search className='search'
              defaultText={this.props.searchParams.query}
              placeholder='Search datasets'
              callback={searchCriteria => this.onSearchChange(searchCriteria)} />
            <div className='list-header'>
              <div className='result-count'>{`${resultCountText}${resultCountQueryText}`}</div>
              <Select className='sort-select'
                label='order by'
                options={this.createSortOptions}
                selectChangeCallback={sort => this.onSortChange(sort)} />
            </div>
            <DatasetList datasets={this.props.searchResults} />
            <Paginator className='paginator' numberOfPages={this.numberOfPages} currentPage={this.props.pageNumber} pageChangeCallback={page => this.onPageChange(page)} />
          </div>
        </dataset-list-view>
      )
    }
  }
}
