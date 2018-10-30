import './dataset-list-view.scss'
import { Component, createRef } from 'react'
import DatasetList from '../../components/dataset-list'
import Paginator from '../../components/generic-elements/paginator'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = { currentPage: 1, pageSize: 10 }
    this.pageRef = createRef()
  }

  componentDidMount () {
    this.fetchData(this.state.currentPage)
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
    this.props.retrieveDataset({ page: pageNumber, pageSize: this.state.pageSize })
  }

  get numberOfPages () {
    return Math.ceil(this.props.totalDatasets / this.state.pageSize)
  }

  render () {
    return (
      <dataset-list-view ref={this.pageRef}>
        <div className='left-section' />
        <div className='right-section'>
          <div className='search-placeholder' />
          <DatasetList datasets={this.props.datasets} />
          <Paginator className='paginator' numberOfPages={this.numberOfPages} currentPage={this.state.currentPage} pageChangeCallback={page => this.onPageChange(page)} />
        </div>
      </dataset-list-view>
    )
  }
}
