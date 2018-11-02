import './dataset-list-view.scss'
import { Component, createRef } from 'react'
import DatasetList from '../../components/dataset-list'
import Paginator from '../../components/generic-elements/paginator'
import Select from '../../components/generic-elements/select'
import Search from '../../components/generic-elements/search'
import queryString from 'query-string'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = { currentPage: 1, pageSize: 10 }
    this.pageRef = createRef()
  }

  componentDidMount () {
    this.fetchData(this.state.currentPage)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.location !== this.props.location) {
      this.fetchData(this.state.currentPage)
    }
  }
  render () {
    const resultCountText = `${this.totalDatasets || 'No'} datasets found`
    const resultCountQueryText = this.searchParams ? ` for "${this.searchParams}"` : ''

    return (
      <dataset-list-view ref={this.pageRef}>
        <div className='left-section' />
        <div className='right-section'>
          {!this.props.loading && <Search className='search' defaultText={this.searchParams} placeholder='Search datasets' callback={searchCriteria => this.onSearchChange(searchCriteria)} />}
          <div className='list-header'>
            <div className='result-count'>{`${resultCountText}${resultCountQueryText}`}</div>
            <Select className='sort-select' label='order by' options={this.createSortOptions} selectChangeCallback={sort => this.onSortChange(sort)} />
          </div>
          <DatasetList datasets={this.props.datasets} />
          <Paginator className='paginator' numberOfPages={this.numberOfPages} currentPage={this.state.currentPage} pageChangeCallback={page => this.onPageChange(page)} />
        </div>
      </dataset-list-view>
    )
  }

  onPageChange (page) {
    this.setState({ currentPage: page })
    this.fetchData(page)

    // Shallow rendering does not play nice with refs
    if (this.pageRef.current) {
      this.pageRef.current.scrollTop = 0
    }
  }

  fetchData (pageNumber) {
    this.props.retrieveDataset({ page: pageNumber, pageSize: this.state.pageSize, sort: this.sort, query: this.searchParams })
  }

  onSortChange (sort) {
    this.setState({ currentPage: 1 })
    this.updateQueryParameters(this.searchParams, sort)
  }

  onSearchChange (criteria) {
    this.setState({ currentPage: 1 })
    this.updateQueryParameters(criteria, this.sort)
  }

  updateQueryParameters (searchCriteria, sort) {
    this.props.history.push({
      search: queryString.stringify({ q: searchCriteria, sort: sort })
    })
  }

  get numberOfPages () {
    return Math.ceil(this.props.totalDatasets / this.state.pageSize)
  }

  get searchParams () {
    return queryString.parse(this.props.location.search).q
  }

  get sort () {
    return queryString.parse(this.props.location.search).sort
  }

  get totalDatasets () {
    return this.props.totalDatasets
  }

  get createSortOptions () {
    return [
      { value: 'name_asc', label: 'Name Ascending', default: this.sort === 'name_asc' },
      { value: 'name_desc', label: 'Name Descending', default: this.sort === 'name_desc' },
      { value: 'last_mod', label: 'Last Modified', default: this.sort === 'last_mod' }
    ]
  }
}
