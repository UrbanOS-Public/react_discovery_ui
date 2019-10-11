import { connect } from 'react-redux'
import VisualizationView from './visualization-view'
import { visualizationFetch, resetVisualization, visualizationCreate } from '../../store/actions'
import { getFreestyleQueryText } from '../../store/query-selectors'
import { visualizationTitle, visualizationSaving, visualizationLoading, visualizationError, isVisualizationSavable} from '../../store/visualization-selectors'

const mapStateToProps = state => {
    return {
        title: visualizationTitle(state),
        isLoading: visualizationLoading(state),
        isError: visualizationError(state),
        isSaving: visualizationSaving(state),
        isSavable: isVisualizationSavable(state),
        query: getFreestyleQueryText(state)
    }
}

const mapDispatchToProps = dispatch => ({
    getVisualization: (id) => dispatch(visualizationFetch(id)),
    resetVisualization: () => dispatch(resetVisualization()),
    createVisualization: (title, query) => dispatch(visualizationCreate(title, query))
})

export default connect(mapStateToProps, mapDispatchToProps)(VisualizationView)

