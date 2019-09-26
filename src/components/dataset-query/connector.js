import { connect } from 'react-redux'
import DatasetQuery from './dataset-query'
import { determineIfVisualizationQueryLoading } from '../../store/selectors'
import { QUERY_DATASET_CANCELLED } from '../../store/actions';

const mapStateToProps = state => {
  return {
    queryFailureMessage: state.presentation.queryFailureMessage,
    isLoading: determineIfVisualizationQueryLoading(state)
  }
}

const mapDispatchToProps = dispatch => ({
  onCancelQuery: () => dispatch({ type: QUERY_DATASET_CANCELLED, value: null })
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetQuery)
