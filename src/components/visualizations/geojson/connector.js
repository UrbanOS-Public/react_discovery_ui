import { connect } from 'react-redux'
import GeoJSONVisualization from './geojson-visualization'
import { downloadDataset } from '../../../store/actions'
import { getDownloadedDataset } from '../../../store/selectors'

const mapStateToProps = state => {
  return {
    geoJsonData: getDownloadedDataset(state)
  }
}

const mapDispatchToProps = dispatch => ({
  downloadDataset: (datasetId, format) => dispatch(downloadDataset(datasetId, format))
})

export default connect(mapStateToProps, mapDispatchToProps)(GeoJSONVisualization)
