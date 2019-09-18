import { connect } from 'react-redux'
import DatasetVisualizationView from './dataset-visualization-view'
import { getVisualizationDataSources, getDatasetQueryResult} from '../../store/selectors'

const mapStateToProps = state => {
  return {
    dataSources: getVisualizationDataSources(state),
    queryData: getDatasetQueryResult(state)
  }
}

export default connect(mapStateToProps)(DatasetVisualizationView)
