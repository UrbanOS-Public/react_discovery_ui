import { connect } from 'react-redux'
import VisualizationView from './visualization-view'
import { visualizationLoad, visualizationReset, visualizationSave, resetQuery, resetDatasetReferences } from '../../store/actions'
import { getFreestyleQueryText } from '../../store/query-selectors'
import {
  visualizationTitle,
  visualizationSaving,
  isVisualizationSaveable,
  visualizationSaveSuccess,
  visualizationID,
  visualizationLoadFailure,
  visualizationSaveFailure,
  visualizationChart,
  visualizationAllowedActions
} from '../../store/visualization-selectors'
import withAuth0 from '../../auth/auth0-wrapper'

const mapStateToProps = state => {
  return {
    id: visualizationID(state),
    title: visualizationTitle(state),
    query: getFreestyleQueryText(state),
    allowedActions: visualizationAllowedActions(state),
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
  reset: () => { dispatch(visualizationReset()); dispatch(resetQuery()); dispatch(resetDatasetReferences()) },
  save: ({ id, title, query, shouldCreateCopy }) => dispatch(visualizationSave({ id, title, query, shouldCreateCopy }))
})

export default connect(mapStateToProps, mapDispatchToProps)(withAuth0(VisualizationView))
