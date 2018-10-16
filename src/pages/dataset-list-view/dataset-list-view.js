import './dataset-list-view.scss'
import { Component } from 'react'
import DatasetList from '../../components/dataset-list'

export default class extends Component {
  componentDidMount () {
    this.props.retrieveDataset()
  }

  get isLoading () {
    return (!this.props.datasets || this.props.datasets.length === 0)
  }

  render () {
    return (
      <dataset-list-view>
        <div className='left-section' />
        <div className='right-section'>
          <DatasetList datasets={this.props.datasets} />
        </div>
      </dataset-list-view>
    )
  }
}
