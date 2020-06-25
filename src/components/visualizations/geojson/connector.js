import { connect } from 'react-redux'
import GeoJSONVisualization from './geojson-visualization'
import { downloadDataset, retrieveDatasetPreview } from '../../../store/actions'
import { getDownloadedDataset, getDataSetPreview, getDownloadedDatasetError } from '../../../store/selectors'

const mapStateToProps = state => {
  return {
    downloadedGeoJsonData: getDownloadedDataset(state),
    previewedGeoJsonData: getDataSetPreview(state, 'geojson'),
    downloadedDatasetError: getDownloadedDatasetError(state)
  }
}

const mapDispatchToProps = dispatch => ({
  downloadDataset: (datasetId, format) => dispatch(downloadDataset(datasetId, format)),
  previewDataset: (datasetId, format) => dispatch(retrieveDatasetPreview(datasetId, format))
})

export default connect(mapStateToProps, mapDispatchToProps)(GeoJSONVisualization)
