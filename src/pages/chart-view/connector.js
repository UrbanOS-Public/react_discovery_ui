import { connect } from 'react-redux'
import ChartView from './chart-view'
import { getVisualizationDataSources, getQueryIsLoading, shouldAutoFetchQuery } from '../../store/query-selectors'
import { executeFreestyleQuery } from '../../store/actions'

const mapStateToProps = state => {
  return {
    dataSources: getVisualizationDataSources(state),
    isQueryLoading: getQueryIsLoading(state),
    autoFetchQuery: shouldAutoFetchQuery(state)
  }
}

const mapDispatchToProps = dispatch => ({
  executeQuery: () => dispatch(executeFreestyleQuery())
})

export default connect(mapStateToProps, mapDispatchToProps)(ChartView)
