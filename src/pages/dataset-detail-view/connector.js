import { connect } from 'react-redux'
import DatasetDetailView from './dataset-detail-view'
import { retrieveDatasetDetails, clearDatasetDetails, clearDatasetPreview } from '../../store/actions'
import { getDataSet, getDataSetError } from '../../store/selectors'

const mapStateToProps = state => {
  return {
    dataset: getDataSet(state)
  }
}

const mapDispatchToProps = dispatch => ({
  retrieveDatasetDetails: (org_name, dataset_name) => dispatch(retrieveDatasetDetails(org_name, dataset_name)),
  clearDatasetDetails: () => dispatch(clearDatasetDetails()),
  clearDatasetPreview: () => dispatch(clearDatasetPreview())
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetDetailView)
