import { Component } from 'react'
import DatasetDetails from '../../components/dataset-details'
import DatasetPreview from '../../components/dataset-preview'
import Organization from '../../components/organization'
import Share from '../../components/share'
import './dataset-detail-view.scss'

export default class extends Component {
  componentDidMount() {
    this.props.retrieveDatasetDetails(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.clearDatasetDetails()
  }

  render() {
    const { dataset } = this.props

    return (
      <dataset-view>
        <div>
          {dataset && <Organization organization={dataset.organization} />}
          <Share />
        </div>
        <div className='dataset_details'>
          <DatasetDetails dataset={dataset} />
          {dataset && <DatasetPreview dataset_id={dataset.id} />}
        </div>
      </dataset-view>
    )
  }
}
