import { Component } from 'react'
import DatasetDetails from '../../components/dataset-details'
import DatasetPreview from '../../components/dataset-preview'
import DatasetMetadata from '../../components/dataset-metadata'
import DatasetDictionary from '../../components/dataset-dictionary'
import Organization from '../../components/organization'
import Share from '../../components/share'
import './dataset-detail-view.scss'
import DatasetApiDoc from '../../components/dataset-api-doc'
import StreamingApiDoc from '../../components/streaming-api-doc'
import DatasetQuality from '../../components/dataset-quality'
import GeoJSONVisualization from '../../components/visualizations/geojson'
import DatasetRecommendations from '../../components/dataset-recommendations'

export default class extends Component {
  componentDidMount() {
    this.props.retrieveDatasetDetails(this.props.match.params.organizationName, this.props.match.params.datasetName)
  }

  componentWillUnmount() {
    this.props.clearDatasetPreview()
    this.props.clearDatasetDetails()
  }

  render() {
    const dataset = this.props.dataset
    if (!dataset) { return <div /> }

    const isStreaming = dataset.sourceType === 'stream'
    const isIngest = dataset.sourceType === 'ingest' || isStreaming
    const isRemote = dataset.sourceType === 'remote'
    const isHost = dataset.sourceType === 'host'

    const isCsv = dataset.sourceFormat && dataset.sourceFormat.toLowerCase() === 'csv'
    const isGeoJSON = dataset.sourceFormat === 'geojson' && !isRemote

    const streamingExpanded = !isCsv && isStreaming
    const apiDocExpanded = !isCsv && !isStreaming

    return (
      <dataset-detail-view>
        <div className='left-section'>
          <Organization organization={dataset.organization} />
          <Share />
        </div>
        <div className='dataset-details right-section'>
          <DatasetDetails dataset={dataset} />
          {!isIngest && !isGeoJSON && <div className='static-file-explanation'>This dataset is hosted as a static file and cannot be previewed or queried via the API.</div>}
          {isCsv && isIngest && <DatasetPreview datasetId={dataset.id} />}
          {isStreaming && <StreamingApiDoc dataset={dataset} expanded={streamingExpanded} />}
          <DatasetRecommendations datasetId={dataset.id} />
          {isGeoJSON && <GeoJSONVisualization datasetId={dataset.id} format={dataset.sourceFormat} />}
          {isIngest && <DatasetApiDoc dataset={dataset} expanded={apiDocExpanded} />}
          {isIngest && <DatasetQuality completeness={dataset.completeness} expanded={false} />}
          <DatasetDictionary datasetId={dataset.id} schema={dataset.schema} />
          <DatasetMetadata dataset={dataset} />
        </div>
      </dataset-detail-view>
    )
  }
}
