import { connect } from 'react-redux'
import ChartView from './chart-view'
import { getFreestyleQueryText } from '../../store/query-selectors'
import { getVisualizationDataSources, getQueryData, getQueryIsLoading, isQueryDataAvailable } from '../../store/query-selectors'

const mapStateToProps = state => {
  return {
    dataSources: getVisualizationDataSources(state),
    isQueryLoading: getQueryIsLoading(state),
    freestyleQueryText: getFreestyleQueryText(state),
    queryData: getQueryData(state),
    queryDataInitialized: isQueryDataAvailable(state)
  }
}

export default connect(mapStateToProps)(ChartView)
