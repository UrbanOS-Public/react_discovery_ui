import React, {useEffect} from 'react'
import qs from 'qs'
import _ from 'lodash'

const DEFAULT_SORT_ORDER = 'name_asc'
const DEFAULT_CURRENT_PAGE = 1
const DEFAULT_SEARCH_TEXT = ''
const DEFAULT_FACETS = {}

class QueryParamsManager {
  constructor(history) {
    this.history = history
  }

  getQueryParam(param) {
    return qs.parse(this.history.location.search, { ignoreQueryPrefix: true })[param]
  }

  getQueryParams() {
    return {
      apiAccessible: this.apiAccessible,
      currentPage: this.currentPage,
      facets: this.facets,
      searchText: this.searchText,
      sortOrder: this.sortOrder
    }
  }

  toggleApiAccessible() {
    const currentSearch = qs.parse(this.history.location.search, {ignoreQueryPrefix: true})
    const updatedApiAccessibleFlag = ! this.apiAccessible

    const updatedSearch = Object.assign({}, currentSearch, {apiAccessible: updatedApiAccessibleFlag})
    const updatedSearchEncoded = qs.stringify(updatedSearch, { arrayFormat: 'brackets', addQueryPrefix: false })

    this.history.push({search: updatedSearchEncoded})
  }

  toggleFacet(name, value) {
    const currentSearch = qs.parse(this.history.location.search, {ignoreQueryPrefix: true})
    const facetValues = this.facets[name]
    const updatedFacets = Object.assign(this.facets, { [name]: _.xor(facetValues, [value]) })

    const updatedSearch = Object.assign({}, currentSearch, {facets: updatedFacets})
    const updatedSearchEncoded = qs.stringify(updatedSearch, { arrayFormat: 'brackets', addQueryPrefix: false })
    const decodedSearch = qs.parse(updatedSearchEncoded, {ignoreQueryPrefix: true})

    this.history.push({search: updatedSearchEncoded})
  }

  get apiAccessible() {
    return this.getQueryParam('apiAccessible') !== 'false'
  }

  get sortOrder() {
    return this.getQueryParam('sort') || DEFAULT_SORT_ORDER
  }

  get currentPage() {
    return Number.parseInt(this.getQueryParam('page')) || DEFAULT_CURRENT_PAGE
  }

  get searchText() {
    return this.getQueryParam('q') || DEFAULT_SEARCH_TEXT
  }

  get facets() {
    return this.getQueryParam('facets') || DEFAULT_FACETS
  }
}

const withQueryParamsManager = (WrappedComponent, handler) => {
  const comp = (props) => {
    const {history} = props
    const queryParamsManager = new QueryParamsManager(history)

    const callHandler = () => {
      const updatedParams = queryParamsManager.getQueryParams()
      handler(updatedParams)
    }

    useEffect(callHandler, [history.location.search])

    return (<WrappedComponent queryParamsManager={queryParamsManager} {...props} />)
  }
  return comp
}

export default withQueryParamsManager
export {QueryParamsManager}
