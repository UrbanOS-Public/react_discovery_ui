import { Component } from 'react'
import DatasetDetails from '../../components/dataset-details'
import DatasetPreview from '../../components/dataset-preview'
import DatasetRemoteInfo from '../../components/dataset-remote-info'
import Organization from '../../components/organization'
import Share from '../../components/share'
import './dataset-detail-view.scss'
import DatasetApiDoc from '../../components/dataset-api-doc/dataset-api-doc'

export default class extends Component {
  componentDidMount () {
    this.props.retrieveDatasetDetails(this.props.match.params.id)
  }

  componentWillUnmount () {
    this.props.clearDatasetDetails()
  }

  render () {
    const { dataset } = this.props
    if (!dataset) { return <div /> }

    return (
      <dataset-view>
        <div>
          <Organization organization={dataset.organization} />
          <Share />
        </div>

        <div className='dataset-details'>
          <DatasetDetails dataset={dataset} />
          <div className='data-and-resources-header'>Data & Resources</div>
          {renderAdditionalDetails(dataset)}
        </div>
      </dataset-view>
    )
  }
}

function renderAdditionalDetails (dataset) {
  if (dataset.sourceType === 'remote') {
    return (<DatasetRemoteInfo datasetSourceUrl={dataset.sourceUrl} />)
  }
  return (
    <span>
      <div>
        <ul className='table-of-contents'>
          <li><a href='#Preview'>Preview</a></li>
          <li><a href='#APIDocs'>API Docs</a></li>
        </ul>
      </div>
      <a name='Preview' />
      <DatasetPreview datasetId={dataset.id} />
      <a name='APIDocs' />
      <DatasetApiDoc dataset={dataset} />
    </span>
  )
}
