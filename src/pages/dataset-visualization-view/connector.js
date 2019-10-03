import { connect } from 'react-redux'
import DatasetVisualizationView from './dataset-visualization-view'
import { getVisualizationDataSources, getDatasetQueryResult, determineIfVisualizationQueryLoading, getFreestyleQueryText } from '../../store/selectors'

const mapStateToProps = state => {
  return {
    dataSources: getVisualizationDataSources(state),
    isLoading: determineIfVisualizationQueryLoading(state),
    freestyleQueryText: getFreestyleQueryText(state),
    queryData: getDatasetQueryResult(state)
  }
}

export default connect(mapStateToProps)(DatasetVisualizationView)
