import { connect } from 'react-redux'
import DatasetView from './dataset-view'
import { retrieveDatasetDetails, resetQuery } from '../../store/actions'
import { getDataset, isRemoteDataset, isHostDataset, isDatasetLoaded } from '../../store/dataset-selectors'
import { shouldAutoExecuteQuery } from '../../store/query-selectors'

const mapStateToProps = state => {
  return {
    dataset: getDataset(state),
    isDatasetLoaded: isDatasetLoaded(state),
    isRemoteDataset: isRemoteDataset(state),
    isHostDataset: isHostDataset(state),
    shouldAutoExecuteQuery: shouldAutoExecuteQuery(state),
  }
}

const mapDispatchToProps = dispatch => ({
  retrieveDatasetDetails: (org_name, dataset_name) => dispatch(retrieveDatasetDetails(org_name, dataset_name)),
  resetQuery: () => dispatch(resetQuery())
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetView)
