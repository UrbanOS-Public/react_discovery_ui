import { connect } from 'react-redux'
import DatasetVisualizationView from './dataset-visualization-view'
import { getVisualizationDataSources, getDatasetQueryResult, determineIfVisualizationQueryLoading, getFreestyleQueryText, getDatasetRecommendations } from '../../store/selectors'
import { datasetRecommendations } from '../../store/actions'

const mapStateToProps = state => {
  return {
    dataSources: getVisualizationDataSources(state),
    // isLoading: determineIfVisualizationQueryLoading(state),
    freestyleQueryText: getFreestyleQueryText(state),
    // queryData: getDatasetQueryResult(state),
    // recommendations: getDatasetRecommendations(state)
  }
}

const mapDispatchToProps = dispatch => ({
  // getRecommendations: datasetId => dispatch(datasetRecommendations(datasetId))
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetVisualizationView)
