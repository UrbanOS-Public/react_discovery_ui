import { connect } from 'react-redux'
import DatasetPreview from './dataset-preview'
import { retrieveDatasetPreview } from '../../store/actions'
import { getDataSetPreview } from '../../store/selectors'

const mapStateToProps = state => {
  return {
    datasetPreview: getDataSetPreview(state)
  }
}

const mapDispatchToProps = dispatch => ({
  retrieveDatasetPreview: dataset_id => dispatch(retrieveDatasetPreview(dataset_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetPreview)
