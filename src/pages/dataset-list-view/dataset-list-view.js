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
    this.state = {  pageSize: 10 }
  }

  componentDidMount() {
    console.log(this.currentPage)
    this.refreshDatasets(this.searchParams, this.sort, this.facets, this.currentPage, this.apiAccessible)
  }

  componentDidUpdate() {
    window.onpopstate = (e) => {
      this.props.fetchData(this.currentPage, this.state.pageSize, this.sort, this.searchParams, this.facets, this.apiAccessible)
    }
  }

  onPageChange(page) {
    this.refreshDatasets(this.searchParams, this.sort, this.facets, page, this.apiAccessible)
  }

  onRemoteToggleClick() {
    this.refreshDatasets(this.searchParams, this.sort, this.facets, 1, !this.apiAccessible)
  }

  onFacetClick(facetName, facetValue) {
    const updatedFacets = this.toggleFacetValue(facetName, facetValue)

    this.refreshDatasets(
      this.searchParams,
      this.sort,
      updatedFacets,
      1,
      this.apiAccessible
    )
  }

  onSortChange(sort) {
    this.refreshDatasets(this.searchParams, sort, this.facets, 1, this.apiAccessible)
  }

  onSearchChange(criteria) {
    this.refreshDatasets(criteria, this.sort, this.facets, 1, this.apiAccessible)
  }

  toggleFacetValue(facetName, facetValue) {
    const facetValues = _.get(this.facets, facetName)
    return Object.assign(this.facets || {}, { [facetName]: _.xor(facetValues, [facetValue]) })
  }

  refreshDatasets(criteria, sort, facets, pageNumber, apiAccessible) {
    this.updateQueryParameters(criteria, sort, facets, apiAccessible, pageNumber)
    this.props.fetchData(pageNumber, this.state.pageSize, sort, criteria, facets, apiAccessible)
  }

  updateQueryParameters(searchCriteria, sort, facets, apiAccessible, page) {
    this.props.history.push({
      search: QueryStringBuilder.createQueryString(facets, searchCriteria, sort, apiAccessible, page)
    })
  }

  getQueryParam(param) {
    return qs.parse(this.props.location.search, { ignoreQueryPrefix: true })[param]
  }

  get numberOfPages() {
    return Math.ceil(this.props.totalDatasets / this.state.pageSize)
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

  get currentPage() {
    return parseInt(this.getQueryParam("page")) || 1
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
    const resultCountText = `${this.props.totalDatasets || 'No'} datasets found`
    const resultCountQueryText = this.searchParams ? ` for "${this.searchParams}"` : ''
    const token = sessionStorage.getItem('api-token')
    if (this.props.error) {
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
              selected={this.apiAccessible} />
            <FacetSidebar
              availableFacets={this.props.facets}
              appliedFacets={this.facets}
              clickHandler={(facetName, facetValue) => this.onFacetClick(facetName, facetValue)} />
          </div>
          <div className='right-section'>
            <Search className='search'
              defaultText={this.searchParams}
              placeholder='Search datasets'
              callback={searchCriteria => this.onSearchChange(searchCriteria)} />
            <div className='list-header'>
              <div className='result-count'>{`${resultCountText}${resultCountQueryText}`}</div>
              <Select className='sort-select'
                label='order by'
                options={this.createSortOptions}
                selectChangeCallback={sort => this.onSortChange(sort)} />
            </div>
            <DatasetList datasets={this.props.datasets} />
            <Paginator className='paginator' numberOfPages={this.numberOfPages} currentPage={this.currentPage} pageChangeCallback={page => this.onPageChange(page)} />
          </div>
        </dataset-list-view>
      )
    }
  }
}
