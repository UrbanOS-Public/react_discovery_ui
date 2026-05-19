import { connect } from 'react-redux'
import DatasetPreview from './dataset-preview'
import { retrieveDatasetPreview } from '../../store/actions'
import { getDataSetPreview, getDataSet } from '../../store/selectors'

const mapStateToProps = (state, { format }) => {
  const dataset = getDataSet(state)
  return {
    datasetPreview: getDataSetPreview(state, format),
    previewLoading: state.presentation.previewLoading,
    datasetName: dataset && dataset.title
  }
}

const mapDispatchToProps = dispatch => ({
  retrieveDatasetPreview: datasetId => dispatch(retrieveDatasetPreview(datasetId))
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetPreview)
