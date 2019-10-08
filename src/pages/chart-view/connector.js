import { connect } from 'react-redux'
import ChartView from './chart-view'
import { getVisualizationDataSources, getDatasetQueryResult, determineIfVisualizationQueryLoading } from '../../store/selectors'

const mapStateToProps = (state, ownProps) => {
  return {
    dataSources: getVisualizationDataSources(state),
    isLoading: determineIfVisualizationQueryLoading(state),
    queryResults: getDatasetQueryResult(state),
    queryText: ownProps.queryText
  }
}

export default connect(mapStateToProps)(ChartView)
