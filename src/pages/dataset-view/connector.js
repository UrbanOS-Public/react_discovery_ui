import { connect } from 'react-redux'
import DatasetView from './dataset-view'
import { retrieveDatasetDetails, resetQuery, visualizationSave, visualizationReset, resetDatasetReferences } from '../../store/actions'
import { getDataset, isRemoteDataset, isHostDataset, isDatasetLoaded } from '../../store/dataset-selectors'
import { getFreestyleQueryText, shouldAutoExecuteQuery } from '../../store/query-selectors'
import {
  isVisualizationSaveable,
  visualizationSaveSuccess,
  visualizationSaveFailure,
  visualizationID,
  visualizationTitle,
  visualizationAllowedActions
} from '../../store/visualization-selectors'

import withAuth0 from '../../auth/auth0-wrapper'

const mapStateToProps = state => {
  return {
    visualizationId: visualizationID(state),
    query: getFreestyleQueryText(state),
    title: visualizationTitle(state),
    allowedActions: visualizationAllowedActions(state),
    dataset: getDataset(state),
    isDatasetLoaded: isDatasetLoaded(state),
    isRemoteDataset: isRemoteDataset(state),
    isHostDataset: isHostDataset(state),
    shouldAutoExecuteQuery: shouldAutoExecuteQuery(state),
    isSaveable: isVisualizationSaveable(state),
    isSaveFailure: visualizationSaveFailure(state),
    isSaveSuccess: visualizationSaveSuccess(state)
  }
}

const mapDispatchToProps = dispatch => ({
  save: ({ id, title, query, shouldCreateCopy }) => dispatch(visualizationSave({ id, title, query, shouldCreateCopy })),
  retrieveDatasetDetails: (org_name, dataset_name) => dispatch(retrieveDatasetDetails(org_name, dataset_name)),
  reset: () => { dispatch(visualizationReset()); dispatch(resetQuery()); dispatch(resetDatasetReferences()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetView)
