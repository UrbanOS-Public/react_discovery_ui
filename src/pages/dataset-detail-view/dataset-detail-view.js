import { Component } from 'react'
import DatasetDetails from '../../components/dataset-details'
import DatasetPreview from '../../components/dataset-preview'
import Organization from '../../components/organization'
import Share from '../../components/share'
import './dataset-detail-view.scss'
import DatasetApiDoc from '../../components/dataset-api-doc/dataset-api-doc';

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
          <div className='data-and-resources-header'>Data & Resources</div>
          <div>
            <ul className="table-of-contents">
              <li><a href="#Preview">Preview</a></li>
              <li><a href="#APIDocs">API Docs</a></li>
            </ul>
          </div>
          <a name="Preview"></a>
          {dataset && <DatasetPreview dataset_id={dataset.id} />}
          <a name="APIDocs"></a>
          <DatasetApiDoc dataset={dataset} />
        </div>
      </dataset-view>
    )
  }
}
