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
import RemoteToggle from '../../components/remote-toggle'
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
    this.refreshDatasets(this.searchParams, this.sort, this.facets, this.pageNumber, this.includeRemote)
  }

  onPageChange(page) {
    this.setState({ currentPage: page })
    this.refreshDatasets(this.searchParams, this.sort, this.facets, page, this.includeRemote)
  }

  onRemoteToggleClick() {
    this.refreshDatasets(this.searchParams, this.sort, this.facets, 1, !this.includeRemote)
  }

  onFacetClick(facetName, facetValue) {
    this.setState({ currentPage: 1 })

    const updatedFacets = this.toggleFacetValue(facetName, facetValue)

    this.refreshDatasets(
      this.searchParams,
      this.sort,
      updatedFacets,
      1,
      this.includeRemote
    )
  }

  onSortChange(sort) {
    this.setState({ currentPage: 1 })
    this.refreshDatasets(this.searchParams, sort, this.facets, 1, this.includeRemote)
  }

  onSearchChange(criteria) {
    this.setState({ currentPage: 1 })
    this.refreshDatasets(criteria, this.sort, this.facets, 1, this.includeRemote)
  }

  toggleFacetValue(facetName, facetValue) {
    const facetValues = _.get(this.facets, facetName)
    return Object.assign(this.facets || {}, { [facetName]: _.xor(facetValues, [facetValue]) })
  }

  refreshDatasets(criteria, sort, facets, pageNumber, includeRemote) {
    this.updateQueryParameters(criteria, sort, facets, includeRemote)
    this.props.fetchData(pageNumber, this.state.pageSize, sort, criteria, facets, includeRemote)
  }

  updateQueryParameters(searchCriteria, sort, facets, includeRemote) {
    this.props.history.push({
      search: QueryStringBuilder.createQueryString(facets, searchCriteria, sort, includeRemote)
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

  get includeRemote() {
    const includeRemote = this.getQueryParam("includeRemote")
    // Convert to boolean with a default of true
    return includeRemote == undefined ? true : _.lowerCase(includeRemote) == "true"
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

  render() {
    const resultCountText = `${this.props.totalDatasets || 'No'} datasets found`
    const resultCountQueryText = this.searchParams ? ` for "${this.searchParams}"` : ''
    const token = sessionStorage.getItem('api-token')
    if (this.props.error) {
      return <ErrorComponent errorText={'We were unable to fetch the datasets, please refresh the page to try again'} />
    } else if (this.props.loading) {
      return <LoadingElement className='spinner' />
    } else {
      return (
        <dataset-list-view ref={this.pageRef}>
          <div>
            <LoginZone token={token} />
            <Checkbox
              clickHandler={() => this.onRemoteToggleClick()}
              text="Include Remote Datasets"
              selected={this.includeRemote} />
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
            <Paginator className='paginator' numberOfPages={this.numberOfPages} currentPage={this.state.currentPage} pageChangeCallback={page => this.onPageChange(page)} />
          </div>
        </dataset-list-view>
      )
    }
  }
}
