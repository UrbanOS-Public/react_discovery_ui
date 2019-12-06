import { connect } from 'react-redux'
import ChartView from './chart-view'
import { getVisualizationDataSources, getQueryIsLoading } from '../../store/query-selectors'
import { executeFreestyleQuery, setChartInformation } from '../../store/actions'
import { visualizationLoading, visualizationChart } from '../../store/visualization-selectors'

const mapStateToProps = state => {
  return {
    dataSources: getVisualizationDataSources(state),
    isLoading: getQueryIsLoading(state) || visualizationLoading(state),
    chart: visualizationChart(state)
  }
}

const mapDispatchToProps = dispatch => ({
  executeQuery: () => dispatch(executeFreestyleQuery()),
  saveChart: (chart) => dispatch(setChartInformation(chart))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChartView)
