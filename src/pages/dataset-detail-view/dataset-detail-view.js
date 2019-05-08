import { Component } from 'react'
import DatasetDetails from '../../components/dataset-details'
import DatasetPreview from '../../components/dataset-preview'
import DatasetMetadata from '../../components/dataset-metadata'
import Organization from '../../components/organization'
import Share from '../../components/share'
import './dataset-detail-view.scss'
import DatasetApiDoc from '../../components/dataset-api-doc/dataset-api-doc'

export default class extends Component {
  componentDidMount () {
    this.props.retrieveDatasetDetails(this.props.match.params.organization_name, this.props.match.params.dataset_name)
  }

  componentWillUnmount () {
    this.props.clearDatasetDetails()
  }

  render () {
    const dataset = this.props.dataset
    if (!dataset) { return <div /> }
    const showPreview = dataset.sourceFormat && dataset.sourceFormat.toLowerCase() === 'csv'
    const isRemote = dataset.sourceType === 'remote'

    return (
      <dataset-view>
        <div>
          <Organization organization={dataset.organization} />
          <Share />
        </div>
        <div className='dataset-details'>
          <DatasetDetails dataset={dataset} />
          {showPreview && !isRemote && <DatasetPreview datasetId={dataset.id} />}
          {!isRemote && <DatasetApiDoc dataset={dataset} />}
          <a name='AdditionalInformation' />
          <DatasetMetadata dataset={dataset} />
        </div>
      </dataset-view>
    )
  }
}
