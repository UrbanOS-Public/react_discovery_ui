import './dataset-list-view.scss'
import { Component, createRef } from 'react'
import DatasetList from '../../components/dataset-list'
import Paginator from '../../components/generic-elements/paginator'
import Select from '../../components/generic-elements/select'
import Search from '../../components/generic-elements/search'
import LoginZone from '../../components/login-zone'
import FacetSidebar from '../../components/facet-sidebar'
import qs from 'qs'
import _ from 'lodash'
import { QueryStringBuilder } from '../../utils'
import ErrorComponent from '../../components/generic-elements/error-component'


import axios from 'axios'
import LoadingElement from '../../components/generic-elements/loading-element';


export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { currentPage: 1, pageSize: 10, loading: true }
    this.pageRef = createRef()
  }

  componentDidMount() {
    this.fetchData(this.state.currentPage).results
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.fetchData(this.state.currentPage)
    }
  }
  render() {
    const resultCountText = `${this.state.totalDatasets || 'No'} datasets found`
    const resultCountQueryText = this.searchParams ? ` for "${this.searchParams}"` : ''
    const token = sessionStorage.getItem('api-token')

    if (this.state.error) {
      return <ErrorComponent errorText={"We were unable to fetch the datasets, please refresh the page to try again"} />
    } else if (this.state.loading) {
      return <LoadingElement className="spinner" />
    } else {
      return (
        <dataset-list-view ref={this.pageRef}>
          <div>
            <LoginZone token={token} />
            <FacetSidebar availableFacets={this.state.facets} appliedFacets={this.facets} clickHandler={(facetName, facetValue) => this.onFacetClick(facetName, facetValue)} />
          </div>
          <div className='right-section'>
            {!this.state.loading && <Search className='search' defaultText={this.searchParams} placeholder='Search datasets' callback={searchCriteria => this.onSearchChange(searchCriteria)} />}
            <div className='list-header'>
              <div className='result-count'>{`${resultCountText}${resultCountQueryText}`}</div>
              <Select className='sort-select' label='order by' options={this.createSortOptions} selectChangeCallback={sort => this.onSortChange(sort)} />
            </div>
            <DatasetList datasets={this.state.datasets} />
            <Paginator className='paginator' numberOfPages={this.numberOfPages} currentPage={this.state.currentPage} pageChangeCallback={page => this.onPageChange(page)} />
          </div>
        </dataset-list-view>
      )
    }
  }

  onPageChange(page) {
    this.setState({ currentPage: page })
    this.fetchData(page)

    // Shallow rendering does not play nice with refs
    if (this.pageRef.current) {
      this.pageRef.current.scrollTop = 0
    }
  }

  async fetchData(pageNumber) {
    this.setState({ loading: true })
    const offset = (pageNumber - 1) * this.state.pageSize
    const params = { offset, pageSize: this.state.pageSize, sort: this.sort, query: this.searchParams, facets: this.facets }
    try {
      const response = await this.getDatasets(params)
      if (response.status === 200) {
        this.setSearchState(response.data)
      } else {
        throw `Could not fetch datasets with response code ${response.code}`
      }
    } catch (e) {
      this.setState({ error: true })
    }
  }

  getDatasets(params) {
    const query = {
      baseURL: window.API_HOST,
      params: params,
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
      withCredentials: true
    }

    return axios.get("/api/v1/dataset/search", query)
  }

  setSearchState(searchResponse) {
    let metadata = searchResponse.metadata
    this.setState({ loading: false, error: false, datasets: searchResponse.results, ...metadata })
  }

  onFacetClick(facetName, facetValue) {
    this.setState({ currentPage: 1 })

    const updatedFacets = this.toggleFacetValue(facetName, facetValue)

    this.updateQueryParameters(
      this.searchParams,
      this.sort,
      updatedFacets
    )
  }

  toggleFacetValue(facetName, facetValue) {
    const facetValues = _.get(this.facets, facetName)
    return Object.assign(this.facets || {}, { [facetName]: _.xor(facetValues, [facetValue]) })
  }

  onSortChange(sort) {
    this.setState({ currentPage: 1 })
    this.updateQueryParameters(this.searchParams, sort, this.facets)
  }

  onSearchChange(criteria) {
    this.setState({ currentPage: 1 })
    this.updateQueryParameters(criteria, this.sort, this.facets)
  }

  updateQueryParameters(searchCriteria, sort, facets) {
    this.props.history.push({
      search: QueryStringBuilder.createQueryString(facets, searchCriteria, sort)
    })
  }

  get numberOfPages() {
    return Math.ceil(this.state.totalDatasets / this.state.pageSize)
  }

  get searchParams() {
    return qs.parse(this.props.location.search.slice(1)).q
  }

  get sort() {
    return qs.parse(this.props.location.search.slice(1)).sort
  }

  get facets() {
    return qs.parse(this.props.location.search.slice(1)).facets
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
}
