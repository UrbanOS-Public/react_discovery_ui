import { connect } from 'react-redux'
import QueryView from './query-view'
import { FREESTYLE_QUERY_DATASET } from '../../store/actions'
import { getVisualizationDataSources, getFreestyleQueryText, getDatasetQueryResult, determineIfVisualizationQueryLoading } from '../../store/selectors'

const mapStateToProps = (state, ownProps) => {
  return {
    dataSources: getVisualizationDataSources(state),
    isLoading: determineIfVisualizationQueryLoading(state),
    queryText: ownProps.queryText || getFreestyleQueryText(state),
    queryResults: getDatasetQueryResult(state)
  }
}

const mapDispatchToProps = dispatch => ({
  onQuery: (queryText) => dispatch({ type: FREESTYLE_QUERY_DATASET, value: { queryText } })
})

export default connect(mapStateToProps, mapDispatchToProps)(QueryView)
