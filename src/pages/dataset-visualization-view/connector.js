import { connect } from 'react-redux'
import DatasetVisualizationView from './dataset-visualization-view'
import { FREESTYLE_QUERY_DATASET } from '../../store/actions'
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
