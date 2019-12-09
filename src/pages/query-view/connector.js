import { connect } from 'react-redux'
import QueryView from './query-view'
import { executeFreestyleQuery, cancelFreestyleQuery, setQueryText } from '../../store/actions'
import { getVisualizationDataSources, getQueryIsLoading, getFreestyleQueryText, getQueryData, getQueryFailureMessage, isQueryDataAvailable } from '../../store/query-selectors'
import { getDatasetRecommendations } from "../../store/selectors"

const mapStateToProps = state => {
  return {
    dataSources: getVisualizationDataSources(state),
    recommendations: getDatasetRecommendations(state),
    isQueryLoading: getQueryIsLoading(state),
    freestyleQueryText: getFreestyleQueryText(state),
    queryData: getQueryData(state),
    queryFailureMessage: getQueryFailureMessage(state),
    isQueryDataAvailable: isQueryDataAvailable(state)
  }
}

const mapDispatchToProps = dispatch => ({
  executeQuery: queryText => dispatch(executeFreestyleQuery(queryText)),
  cancelQuery: () => dispatch(cancelFreestyleQuery()),
  setQueryText: queryText => dispatch(setQueryText(queryText))
})

export default connect(mapStateToProps, mapDispatchToProps)(QueryView)
