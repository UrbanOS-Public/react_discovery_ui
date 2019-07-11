import DatasetListView from './dataset-list-view.js'
import { Component, createRef } from 'react'
import qs from 'qs'
import _ from 'lodash'
import axios from 'axios'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { datasets: [], facets: [], totalDatasets: 0, loading: true, error: false }
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData(pageNumber, pageSize, sort, searchParams, facets, apiAccessible) {
    this.setState({ loading: true })
    const offset = (pageNumber - 1) * pageSize
    let params = { offset, limit: pageSize, sort, query: searchParams, facets, apiAccessible: apiAccessible.toString() }

    this.getDatasets(params).then(response => {
      this.setSearchState(response.data)
    }).catch(error => {
      console.error(`Could not fetch datasets with response code ${error.status}`)
      this.setState({ error: true })
    })
  }

  setSearchState(searchResponse) {
    let metadata = searchResponse.metadata
    this.setState({ loading: false, error: false, datasets: searchResponse.results, ...metadata })
  }

  getDatasets(params) {
    const query = {
      baseURL: window.API_HOST,
      params: params,
      paramsSerializer: (params) => qs.stringify(_.pickBy(params), { arrayFormat: 'brackets' }),
      withCredentials: true
    }

    return axios.get('/api/v1/dataset/search', query)
  }

  render() {
    return (
      <DatasetListView
        {...this.state}
        history={this.props.history}
        fetchData={this.fetchData}
        location={this.props.location} />
    )
  }
}
