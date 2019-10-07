import { connect } from 'react-redux'
import DatasetQuery from './dataset-query'
import { QUERY_DATASET_CANCELLED, FREESTYLE_QUERY_UPDATE } from '../../store/actions';
import { determineIfVisualizationQueryLoading, getFreestyleQueryText } from '../../store/selectors'

const mapStateToProps = state => {
  return {
    queryFailureMessage: state.queryReducer.queryFailureMessage,
    isLoading: determineIfVisualizationQueryLoading(state),
    freestyleQueryText: getFreestyleQueryText(state)
  }
}

const mapDispatchToProps = dispatch => ({
  onCancelQuery: () => dispatch({ type: QUERY_DATASET_CANCELLED, value: null }),
  onUpdateQuery: (query) => dispatch({ type: FREESTYLE_QUERY_UPDATE, value: { queryText: query } })
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetQuery)
