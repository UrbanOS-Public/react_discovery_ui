import { connect } from 'react-redux'
import DatasetQuery from './dataset-query'
import { determineIfVisualizationQueryLoading } from '../../store/selectors'

const mapStateToProps = state => {
  return {
    queryFailureMessage: state.presentation.queryFailureMessage,
    isLoading: determineIfVisualizationQueryLoading(state) // Replace with correct fn
  }
}

export default connect(mapStateToProps)(DatasetQuery)
