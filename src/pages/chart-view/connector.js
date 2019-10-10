import { connect } from 'react-redux'
import ChartView from './chart-view'
import { getDatasetQueryResult, determineIfVisualizationQueryLoading } from '../../store/selectors'
import { getFreestyleQueryText } from '../../store/query-selectors'
import { getVisualizationDataSources, getQueryIsLoading, isQueryDataAvailable } from '../../store/query-selectors'

const mapStateToProps = state => {
  return {
    dataSources: getVisualizationDataSources(state),
    isQueryLoading: getQueryIsLoading(state),
    freestyleQueryText: getFreestyleQueryText(state),
    queryData: getDatasetQueryResult(state),
    queryDataInitialized: isQueryDataAvailable(state)
  }
}

export default connect(mapStateToProps)(ChartView)
