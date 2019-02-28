import { connect } from 'react-redux'
import DatasetView from './dataset-detail-view'
import { retrieveDatasetDetails, clearDatasetDetails } from '../../store/actions'
import { getDataSet, getDataSetError } from '../../store/selectors'

const mapStateToProps = state => {
  return {
    dataset: getDataSet(state),
    displayNetworkError: getDataSetError(state)
  }
}

const mapDispatchToProps = dispatch => ({
  retrieveDatasetDetails: id => dispatch(retrieveDatasetDetails(id)),
  clearDatasetDetails: () => dispatch(clearDatasetDetails())
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetView)
