import { connect } from 'react-redux'
import ChartView from './chart-view'
import { getVisualizationDataSources, getQueryIsLoading, shouldAutoFetchQuery } from '../../store/query-selectors'
import { executeFreestyleQuery, saveChartInformation } from '../../store/actions'
import { visualizationLoading } from '../../store/visualization-selectors'

const mapStateToProps = state => {
  return {
    dataSources: getVisualizationDataSources(state),
    isLoading: getQueryIsLoading(state) || visualizationLoading(state),
    autoFetchQuery: shouldAutoFetchQuery(state)
  }
}

const mapDispatchToProps = dispatch => ({
  executeQuery: () => dispatch(executeFreestyleQuery()),
  saveChart: (chart) => dispatch(saveChartInformation(chart))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChartView)
