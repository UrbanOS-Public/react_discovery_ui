import { Component } from 'react'
import DatasetDetails from '../../components/dataset-details'
import Organization from '../../components/organization'
import Share from '../../components/share'
import './dataset-view.scss'

export default class extends Component {
  componentDidMount () {
    this.props.retrieveDatasetDetails(this.props.match.params.id)
  }

  render () {
    const { dataset } = this.props

    return (
      <dataset-view>
        <div className='left-section'>
          {dataset && <Organization organization={dataset.organization} />}
          <Share />
        </div>
        <div className='right-section'>
          <DatasetDetails dataset={dataset} />
        </div>
      </dataset-view>
    )
  }
}
