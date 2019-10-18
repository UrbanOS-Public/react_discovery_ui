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
import { browserHistory } from 'react-router'
import qs from 'qs'
import _ from 'lodash'
import { QueryStringBuilder } from '../../utils'


export default class extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.updateDatasetSearchParams({
      query: this.getQueryParam("q"),
      sort: this.getQueryParam("sort"),
      facets: this.getQueryParam("facets"),
      offset: this.calculateOffset(parseInt(this.getQueryParam("page") || 1), this.props.searchParams.limit),
      apiAccessible: this.convertStringToBooleanWithDefault(this.getQueryParam("apiAccessible"), false)
    })
    this.fetchData(this.props.searchParams) 
  }

  componentDidUpdate(previousProps){
    const urlSearchString = this.props.history.location.search
    const newSearchString = '?' + this.queryString({...this.props.searchParams, page: this.props.pageNumber})
    const previousSearchString = '?' + this.queryString({...previousProps.searchParams, page: previousProps.pageNumber})
    const stateAndUrlOutOfSync = newSearchString !== urlSearchString
    const stateWasUpdated = newSearchString !== previousSearchString

    if (stateAndUrlOutOfSync) {
      if (stateWasUpdated) {
        this.updateQueryParameters({...this.props.searchParams, page: this.props.pageNumber})
      } else {
        this.props.updateDatasetSearchParams({
          query: this.getQueryParam("q"),
          sort: this.getQueryParam("sort"),
          facets: this.getQueryParam("facets"),
          offset: this.calculateOffset(parseInt(this.getQueryParam("page") || 1), this.props.searchParams.limit),
          apiAccessible: this.convertStringToBooleanWithDefault(this.getQueryParam("apiAccessible"), false)
        })
        this.fetchData(this.props.searchParams)
      }
    }
  }

  convertStringToBooleanWithDefault(value, defaultValue) {
    return value == undefined ? defaultValue : _.lowerCase(value) == "true"
  }

  getQueryParam(param) {
    return qs.parse(this.props.location.search, { ignoreQueryPrefix: true })[param]
  }

  fetchData({pageNumber, limit, sort, query, facets, apiAccessible}) {
    const offset = (pageNumber - 1) * limit
    apiAccessible = apiAccessible
    let params = { offset, limit, sort, query, facets, apiAccessible }

    this.props.datasetSearch(params)
  }

  onSearchChange(criteria) {
    this.props.updateDatasetSearchParams({
      query: criteria,
      offset: 0
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
    this.props.updateDatasetSearchParams({
      offset: this.calculateOffset(page, this.props.searchParams.limit)
    })
    this.props.datasetSearch()
  }

  calculateOffset(page, limit) {
    return (page - 1) * limit
  }

  updateQueryParameters(params) {
    this.props.history.push({
      search: this.queryString(params)
    })
  }

  queryString({sort, facets, apiAccessible, page, ...rest}) {
    return qs.stringify({ q: rest.query, sort, facets, apiAccessible, page }, { arrayFormat: 'brackets' })
  }

  get createSortOptions() {
    return [
      { value: 'name_asc', label: 'Name Ascending', default: this.sort === 'name_asc' },
      { value: 'name_desc', label: 'Name Descending', default: this.sort === 'name_desc' },
      { value: 'last_mod', label: 'Last Modified', default: this.sort === 'last_mod' }
    ]
  }

  renderLoading() {
    if (this.props.isSearchLoading) {
      return (<LoadingElement />)
    }
    else{
      return(<DatasetList datasets={this.props.searchResults} />)
    }
  }

  render() {
    const resultCountText = `${this.props.searchMetadata.totalDatasets || 'No'} datasets found`
    const resultCountQueryText = this.props.searchParams.query ? ` for "${this.props.searchParams.query}"` : ''
    const token = sessionStorage.getItem('api-token')
    if (this.props.error) { //TODO Fix this
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
            {this.renderLoading()}
            <Paginator className='paginator' numberOfPages={this.props.numberOfPages} currentPage={this.props.pageNumber} pageChangeCallback={page => this.onPageChange(page)} />
          </div>
        </dataset-list-view>
      )
    }
  }
}
