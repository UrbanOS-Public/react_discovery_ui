import { connect } from 'react-redux'
import DatasetVisualizationView from './dataset-visualization-view'
import { queryDataset } from '../../store/actions'
import { getVisualizationDataSources } from '../../store/selectors'

const mapStateToProps = state => {
  return {
    dataSources: getVisualizationDataSources(state)
  }
}

const mapDispatchToProps = dispatch => ({
  queryDataset: (organizationName, datasetName, format, limit) => dispatch(queryDataset(organizationName, datasetName, format, limit))
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetVisualizationView)
