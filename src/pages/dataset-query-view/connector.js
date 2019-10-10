import { connect } from 'react-redux'
import DatasetQueryView from './dataset-query-view'
import { executeFreestyleQuery, cancelFreestyleQuery, setQueryText } from '../../store/actions'

import { getVisualizationDataSources, getQueryIsLoading, getFreestyleQueryText, getQueryData, shouldAutoFetchQuery } from '../../store/query-selectors'

const mapStateToProps = state => {
  return {
    dataSources: getVisualizationDataSources(state),
    isQueryLoading: getQueryIsLoading(state),
    isQueryLoaded: state.queryReducer.isQueryLoaded,
    freestyleQueryText: getFreestyleQueryText(state),
    queryData: getQueryData(state),
    queryFailureMessage: state.queryReducer.queryFailureMessage,
    autoFetchQuery: shouldAutoFetchQuery(state)
  }
}

const mapDispatchToProps = dispatch => ({
  executeQuery: queryText => dispatch(executeFreestyleQuery(queryText)),
  cancelQuery: () => dispatch(cancelFreestyleQuery()),
  setQueryText: queryText => dispatch(setQueryText(queryText))
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetQueryView)
