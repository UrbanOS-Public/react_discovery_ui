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
      apiAccessible: this.convertStringToBooleanWithDefault(this.getQueryParam("apiAccessible"), false)
    })
    this.fetchData(this.props.searchParams) 
  }

  componentDidUpdate(){
    // this.updateQueryParameters(this.props.searchParams)
  }

  // shouldComponentUpdate(nextProps, _nextState) {
  //   //TODO there has got to be a better way to do this. Apparently Node has a thing called "DeeplyEqual" to check that nested data structures are the same 
  //   //  all the way down. I think we want to do that but ignore searchParams
  //   if(nextProps.isRunning != this.props.isRunning ||
  //     nextProps.searchResults != this.props.searchResults ||
  //     nextProps.searchMetadata != this.props.searchMetadata) {
  //       return true  
  //   }
  //   if(nextProps.history.location.search === '?' + this.queryString(this.props.searchParams)){
  //     return false
  //   }
  //   return true
  // }

  convertStringToBooleanWithDefault(value, defaultValue) {
    return value == undefined ? defaultValue : _.lowerCase(value) == "true"
  }

  getQueryParam(param) {
    return qs.parse(this.props.location.search, { ignoreQueryPrefix: true })[param]
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
  }

  updateQueryParameters(params) {
    this.props.history.push({
      search: this.queryString(params)
    })
  }

  queryString({sort, facets, apiAccessible, ...rest}) {
    return qs.stringify({ q: rest.query, sort, facets, apiAccessible }, { arrayFormat: 'brackets' })
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
