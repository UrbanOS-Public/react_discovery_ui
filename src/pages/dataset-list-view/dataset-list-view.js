import './dataset-list-view.scss'
import { Component, createRef } from 'react'
import DatasetList from '../../components/dataset-list'
import Paginator from '../../components/generic-elements/paginator'
import Select from '../../components/generic-elements/select'

const sortOptions = [
  {value: "name_asc", label: "Name Ascending", default: true},
  {value: "name_des", label: "Name Descending"},
  {value: "last_mod", label: "Last Modified"}
]

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = { currentPage: 1, pageSize: 10, sort: "name_asc" }
    this.pageRef = createRef()
  }

  componentDidMount () {
    this.fetchData(this.state.currentPage)
  }

  onPageChange (page, sort) {
    this.setState({ currentPage: page, sort: sort })
    this.fetchData(page, this.state.sort)

    // Shallow rendering does not play nice with refs
    if (this.pageRef.current) {
      this.pageRef.current.scrollTop = 0
    }
  }

  onSortChange (sort) {
    this.setState({ currentPage: 1, sort: sort})
    this.fetchData(1, sort)
  }

  fetchData (pageNumber, sort) {
    this.props.retrieveDataset({ page: pageNumber, pageSize: this.state.pageSize, sort: sort })
  }

  get numberOfPages () {
    return Math.ceil(this.props.totalDatasets / this.state.pageSize)
  }

  render () {
    return (
      <dataset-list-view ref={this.pageRef}>
        <div className='left-section' />
        <div className='right-section'>
          <div className='list-header'>
            <div className='result-count'>{this.props.totalDatasets} datasets found</div>
            <Select className='sort-select' label='order by' options={sortOptions} selectChangeCallback={sort => this.onSortChange(sort)} />
          </div>
          <DatasetList datasets={this.props.datasets} />
          <Paginator className='paginator' numberOfPages={this.numberOfPages} currentPage={this.state.currentPage} pageChangeCallback={page => this.onPageChange(page)} />
        </div>
      </dataset-list-view>
    )
  }
}
