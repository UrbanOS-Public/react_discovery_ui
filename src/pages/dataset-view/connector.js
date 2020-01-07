import { connect } from 'react-redux'
import DatasetView from './dataset-view'
import { retrieveDatasetDetails, resetQuery, visualizationSave } from '../../store/actions'
import { getDataset, isRemoteDataset, isHostDataset, isDatasetLoaded } from '../../store/dataset-selectors'
import { getFreestyleQueryText } from '../../store/query-selectors'
import { isVisualizationSaveable, visualizationSaveSuccess, visualizationSaveFailure, visualizationID, visualizationTitle} from '../../store/visualization-selectors'
import { shouldAutoExecuteQuery } from '../../store/query-selectors'
import withAuth0 from "../../auth/auth0-wrapper"

const mapStateToProps = state => {
  return {
    id: visualizationID(state),
    query: getFreestyleQueryText(state),
    title: visualizationTitle(state),
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
  save: ({id, title, query}) => dispatch(visualizationSave({id, title, query})),
  retrieveDatasetDetails: (org_name, dataset_name) => dispatch(retrieveDatasetDetails(org_name, dataset_name)),
  resetQuery: () => dispatch(resetQuery())
})

export default connect(mapStateToProps, mapDispatchToProps)(withAuth0(DatasetView))
