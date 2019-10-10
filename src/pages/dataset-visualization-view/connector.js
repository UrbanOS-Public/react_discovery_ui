import { connect } from 'react-redux'
import DatasetVisualizationView from './dataset-visualization-view'
import { getVisualizationDataSources, getDatasetQueryResult, determineIfVisualizationQueryLoading, getFreestyleQueryText } from '../../store/selectors'
import { getQueryIsLoading, isQueryDataSet } from '../../store/query-selectors'

const mapStateToProps = state => {
  return {
    dataSources: getVisualizationDataSources(state),
    isQueryLoading: getQueryIsLoading(state),
    freestyleQueryText: getFreestyleQueryText(state),
    queryData: getDatasetQueryResult(state),
    queryDataInitialized: isQueryDataSet(state)
  }
}

export default connect(mapStateToProps)(DatasetVisualizationView)
