import { connect } from 'react-redux'
import DatasetPreview from './dataset-preview'
import { retrieveDatasetPreview } from '../../store/actions'
import { getDataSetPreview } from '../../store/selectors'

const mapStateToProps = (state, {format}) => {
  return {
    datasetPreview: getDataSetPreview(state, format),
    previewLoading: state.presentation.previewLoading
  }
}

const mapDispatchToProps = dispatch => ({
  retrieveDatasetPreview: datasetId => dispatch(retrieveDatasetPreview(datasetId))
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetPreview)
