import React, { useEffect } from 'react'
import { useDispatch, connect } from 'react-redux'
import qs from 'qs'
import _ from 'lodash'

import { datasetSearch } from '../store/actions.js'
import PropTypes from 'prop-types'

const defaults = {
  apiAccessible: true,
  sortOrder: 'start',
  page: 1,
  searchText: '',
  facets: {}
}

class SearchParamsManager {
  constructor (history) {
    this.pushHistory = history.push
    this.params = qs.parse(history.location.search, { ignoreQueryPrefix: true })

    this.getParam = this.getParam.bind(this)
    this.getParams = this.getParams.bind(this)

    this.toggleApiAccessible = this.toggleApiAccessible.bind(this)
    this.toggleFacet = this.toggleFacet.bind(this)
    this.updateSearchText = this.updateSearchText.bind(this)
    this.updateSortOrder = this.updateSortOrder.bind(this)
    this.updatePage = this.updatePage.bind(this)

    this.updateParams = this.updateParams.bind(this)

    this.apiAccessible = this.getParam('apiAccessible') !== 'false'
    this.sortOrder = this.getParam('sort') || defaults.sortOrder
    this.page = Number.parseInt(this.getParam('page')) || defaults.page
    this.searchText = this.getParam('q') || defaults.searchText
    this.facets = this.getParam('facets') || defaults.facets
  }

  getParam (name) {
    return this.params[name]
  }

  getParams () {
    return {
      apiAccessible: this.apiAccessible,
      page: this.page,
      facets: this.facets,
      searchText: this.searchText,
      sortOrder: this.sortOrder
    }
  }

  toggleApiAccessible () {
    const updatedApiAccessibleFlag = !this.apiAccessible

    this.updateParams({ apiAccessible: updatedApiAccessibleFlag, page: 1 })
  }

  toggleFacet (name, value) {
    const facetValues = this.facets[name]
    const updatedFacets = Object.assign({}, this.facets, { [name]: _.xor(facetValues, [value]) })
    this.updateParams({ facets: updatedFacets, page: 1 })
  }

  updateSortOrder (sort) {
    this.updateParams({ sort: sort })
  }

  updateSearchText (searchText) {
    const sort = this.sortOrder === 'start' ? 'relevance' : this.sortOrder
    this.updateParams({ q: searchText, page: 1, sort })
  }

  updatePage (page) {
    this.updateParams({ page: page })
  }

  updateParams (params) {
    this.cacheFocusedElement()
    const updatedSearch = Object.assign({}, this.params, params)
    const updatedSearchEncoded = qs.stringify(
      updatedSearch,
      { arrayFormat: 'brackets', addQueryPrefix: false }
    )

    this.pushHistory({ search: updatedSearchEncoded })
  }

  cacheFocusedElement(){
    var focusedElement = document.activeElement;
    var focusedID = null;
    if (focusedElement !== null && focusedElement !== document.body){
      focusedID = focusedElement.id
    }
    sessionStorage.setItem("cachedFocusedElement", focusedID)
  }
}

SearchParamsManager.propTypes = {
  apiAccessible: PropTypes.bool.isRequired,
  sortOrder: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  searchText: PropTypes.string.isRequired,
  facets: PropTypes.object.isRequired,
  toggleApiAccessible: PropTypes.func.isRequired,
  updateSortOrder: PropTypes.func.isRequired,
  updateSearchText: PropTypes.func.isRequired,
  updatePage: PropTypes.func.isRequired
}

const withSearchParamsManager = (WrappedComponent) => {
  const SearchParamsWrapper = (props) => {
    const { history } = props
    const dispatch = useDispatch()
    const searchParamsManager = new SearchParamsManager(history)

    const dispatchDatasetSearch = () => {
      try{
        var cachedElementID = sessionStorage.getItem("cachedFocusedElement")
        sessionStorage.removeItem("cachedFocusedElement")
        var cachedElement = document.getElementById(cachedElementID)
        cachedElement.focus()
      } catch (e) {}

      const updatedParams = searchParamsManager.getParams()
      dispatch(datasetSearch(updatedParams))
    }

    useEffect(dispatchDatasetSearch, [history.location.search])

    return (<WrappedComponent searchParamsManager={searchParamsManager} {...props} />)
  }
  return SearchParamsWrapper
}

withSearchParamsManager.propTypes = {
  history: PropTypes.object.isRequired,
  disptch: PropTypes.func.isRequired
}
export { withSearchParamsManager as default, SearchParamsManager, defaults }
