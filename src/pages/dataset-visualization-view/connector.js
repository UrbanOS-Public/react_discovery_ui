import { connect } from 'react-redux'
import DatasetVisualizationView from './dataset-visualization-view'
import { getVisualizationDataSources } from '../../store/selectors'

const mapStateToProps = state => {
  return {
    dataSources: getVisualizationDataSources(state)
  }
}

export default connect(mapStateToProps)(DatasetVisualizationView)
