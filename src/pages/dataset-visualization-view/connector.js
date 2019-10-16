import { connect } from 'react-redux'
import DatasetVisualizationView from './dataset-visualization-view'
import { getDatasetQueryResult, getFreestyleQueryText } from '../../store/selectors'
import { getQueryIsLoading, isQueryDataSet, getVisualizationDataSources } from '../../store/query-selectors'

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
