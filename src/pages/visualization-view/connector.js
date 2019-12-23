import { connect } from 'react-redux'
import VisualizationView from './visualization-view'
import { visualizationLoad, visualizationReset, visualizationSave, resetQuery } from '../../store/actions'
import { getFreestyleQueryText } from '../../store/query-selectors'
import { visualizationTitle, visualizationSaving, isVisualizationSaveable, visualizationSaveSuccess, visualizationID, visualizationLoadFailure, visualizationSaveFailure, visualizationChart} from '../../store/visualization-selectors'
import withAuth0 from '../../auth/auth0-wrapper'

const mapStateToProps = state => {
    return {
        id: visualizationID(state),
        title: visualizationTitle(state),
        query: getFreestyleQueryText(state),
        isLoadFailure: visualizationLoadFailure(state),
        isSaving: visualizationSaving(state),
        isSaveFailure: visualizationSaveFailure(state),
        isSaveSuccess: visualizationSaveSuccess(state),
        isSaveable: isVisualizationSaveable(state),
        chart: visualizationChart(state)
    }
}

const mapDispatchToProps = dispatch => ({
    load: (id) => dispatch(visualizationLoad(id)),
    reset: () => { dispatch(visualizationReset()); dispatch(resetQuery())},
    save: ({id, title, query}) => dispatch(visualizationSave({id, title, query}))
})

export default connect(mapStateToProps, mapDispatchToProps)(withAuth0(VisualizationView))

