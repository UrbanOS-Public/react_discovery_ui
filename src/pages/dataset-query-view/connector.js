import { connect } from 'react-redux'
import DatasetQueryView from './dataset-query-view'
import { FREESTYLE_QUERY_DATASET } from '../../store/actions'
import { getVisualizationDataSources, getFreestyleQueryText, getDatasetQueryResult, determineIfVisualizationQueryLoading } from '../../store/selectors'

const mapStateToProps = state => {
  return {
    dataSources: getVisualizationDataSources(state),
    isLoading: determineIfVisualizationQueryLoading(state),
    freestyleQueryText: getFreestyleQueryText(state),
    queryData: getDatasetQueryResult(state)
  }
}

const mapDispatchToProps = dispatch => ({
  onQueryDataset: (queryText) => dispatch({ type: FREESTYLE_QUERY_DATASET, value: { queryText } })
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetQueryView)
