import { connect } from 'react-redux'
import ChartView from './chart-view'
import { getVisualizationDataSources, getQueryIsLoading, shouldAutoFetchQuery } from '../../store/query-selectors'
import { executeFreestyleQuery } from '../../store/actions'
import { visualizationLoading } from '../../store/visualization-selectors'

const mapStateToProps = state => {
  return {
    dataSources: getVisualizationDataSources(state),
    isLoading: getQueryIsLoading(state) || visualizationLoading(state),
    autoFetchQuery: shouldAutoFetchQuery(state)
  }
}

const mapDispatchToProps = dispatch => ({
  executeQuery: () => dispatch(executeFreestyleQuery())
})

export default connect(mapStateToProps, mapDispatchToProps)(ChartView)
