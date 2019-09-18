import { connect } from 'react-redux'
import DatasetVisualizationView from './dataset-visualization-view'
import { FREESTYLE_QUERY_DATASET } from '../../store/actions'
import { getVisualizationDataSources, determineIfVisualizationQueryLoading } from '../../store/selectors'

const mapStateToProps = state => {
  return {
    dataSources: getVisualizationDataSources(state),
    isLoading: determineIfVisualizationQueryLoading(state)
  }
}

const mapDispatchToProps = dispatch => ({
  onQueryDataset: (queryText) => dispatch({ type: FREESTYLE_QUERY_DATASET, value: { queryText } })
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetVisualizationView)
