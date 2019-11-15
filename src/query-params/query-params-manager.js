import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import qs from 'qs'
import _ from 'lodash'
import { connect } from "react-redux"
import { datasetSearch } from "../store/actions.js"

const DEFAULT_SORT_ORDER = 'name_asc'
const DEFAULT_CURRENT_PAGE = 1
const DEFAULT_SEARCH_TEXT = ''
const DEFAULT_FACETS = {}
const DEFAULT_API_ACCESSIBLE_FLAG = true

class QueryParamsManager {
  constructor(history) {
    this.history = history
    this.pushHistory = history.push
    this.queryParams = qs.parse(this.history.location.search, { ignoreQueryPrefix: true })


    this.getQueryParam = this.getQueryParam.bind(this)
    this.getQueryParams = this.getQueryParams.bind(this)

    this.toggleApiAccessible = this.toggleApiAccessible.bind(this)
    this.toggleFacet = this.toggleFacet.bind(this)
    this.updateSearchText = this.updateSearchText.bind(this)
    this.updateSortOrder = this.updateSortOrder.bind(this)
    this.updatePage = this.updatePage.bind(this)

    this.updateQueryParams = this.updateQueryParams.bind(this)
  }

  getQueryParam(param) {
    return this.queryParams[param]
  }

  getQueryParams() {
    return {
      apiAccessible: this.apiAccessible,
      page: this.page,
      facets: this.facets,
      searchText: this.searchText,
      sortOrder: this.sortOrder
    }
  }

  toggleApiAccessible() {
    const updatedApiAccessibleFlag = ! this.apiAccessible

    this.updateQueryParams({ apiAccessible: updatedApiAccessibleFlag, page: 1 })
  }

  toggleFacet(name, value) {
    const facetValues = this.facets[name]
    const updatedFacets = Object.assign({}, this.facets, { [name]: _.xor(facetValues, [value]) })

    this.updateQueryParams({ facets: updatedFacets, page: 1 })
  }

  updateSortOrder(sort) {
    this.updateQueryParams({ sort: sort })
  }

  updateSearchText(searchText) {
    this.updateQueryParams({ q: searchText, page: 1 })
  }

  updatePage(page) {
    this.updateQueryParams({ page: page })
  }

  updateQueryParams(params) {
    const updatedSearch = Object.assign({}, this.queryParams, params)
    const updatedSearchEncoded = qs.stringify(updatedSearch, { arrayFormat: 'brackets', addQueryPrefix: false })

    this.pushHistory({search: updatedSearchEncoded})
  }

  get apiAccessible() {
    return this.getQueryParam('apiAccessible') !== 'false'
  }

  get sortOrder() {
    return this.getQueryParam('sort') || DEFAULT_SORT_ORDER
  }

  get page() {
    return Number.parseInt(this.getQueryParam('page')) || DEFAULT_CURRENT_PAGE
  }

  get searchText() {
    return this.getQueryParam('q') || DEFAULT_SEARCH_TEXT
  }

  get facets() {
    return this.getQueryParam('facets') || DEFAULT_FACETS
  }
}

const withQueryParamsManager = (WrappedComponent) => {
  const comp = (props) => {
    const {history} = props
    const dispatch = useDispatch()
    const queryParamsManager = new QueryParamsManager(history)

    const dispatchDatasetSearch = () => {
      const updatedParams = queryParamsManager.getQueryParams()
      dispatch(datasetSearch(updatedParams))
    }

    useEffect(dispatchDatasetSearch, [history.location.search])

    return (<WrappedComponent queryParamsManager={queryParamsManager} {...props} />)
  }
  return comp
}

const defaults = {
  apiAccessible: DEFAULT_API_ACCESSIBLE_FLAG,
  sortOrder: DEFAULT_SORT_ORDER,
  page: DEFAULT_CURRENT_PAGE,
  searchText: DEFAULT_SEARCH_TEXT,
  facets: DEFAULT_FACETS
}
export { withQueryParamsManager as default, QueryParamsManager, defaults }
