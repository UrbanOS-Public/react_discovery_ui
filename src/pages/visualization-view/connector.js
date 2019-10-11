import { connect } from 'react-redux'
import VisualizationView from './visualization-view'
import { visualizationFetch, visualizationReset, visualizationCreate, visualizationCreateFinish } from '../../store/actions'
import { getFreestyleQueryText } from '../../store/query-selectors'
import { visualizationTitle, visualizationSaving, visualizationLoading, isVisualizationSaveable, visualizationSaved, visualizationLoaded, visualizationID, visualizationLoadError, visualizationSaveError} from '../../store/visualization-selectors'

const mapStateToProps = state => {
    return {
        id: visualizationID(state),
        title: visualizationTitle(state),
        query: getFreestyleQueryText(state),
        isLoadError: visualizationLoadError(state),
        isLoading: visualizationLoading(state),
        isLoaded: visualizationLoaded(state),
        isSaveError: visualizationSaveError(state),
        isSaving: visualizationSaving(state),
        isSaved: visualizationSaved(state),
        isSaveable: isVisualizationSaveable(state)
    }
}

const mapDispatchToProps = dispatch => ({
    fetch: (id) => dispatch(visualizationFetch(id)),
    reset: () => dispatch(visualizationReset()),
    create: (title, query) => dispatch(visualizationCreate(title, query)),
    finishCreation: () => dispatch(visualizationCreateFinish())
})

export default connect(mapStateToProps, mapDispatchToProps)(VisualizationView)

