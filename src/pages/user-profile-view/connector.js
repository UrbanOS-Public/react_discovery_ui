import { connect } from 'react-redux'
import UserProfileView from './user-profile-view'
import { visualizationsLoadAll, visualizationDelete, visualizationDeleteClear } from '../../store/actions'
import { userVisualizations, visualizationLoading, visualizationLoadFailure, visualizationLoadSuccess, visualizationDeleteFailure, visualizationDeleteSuccess, visualizationDeleting } from '../../store/visualization-selectors'
import withAuth0 from '../../auth/auth0-wrapper'

const mapStateToProps = state => {
  return {
    visualizations: userVisualizations(state),
    loading: visualizationLoading(state),
    loadFailure: visualizationLoadFailure(state),
    loadSuccess: visualizationLoadSuccess(state),
    deleteFailure: visualizationDeleteFailure(state),
    deleteSuccess: visualizationDeleteSuccess(state),
    deleting: visualizationDeleting(state)
  }
}

const mapDispatchToProps = dispatch => ({
  getUserVisualizations: () => dispatch(visualizationsLoadAll()),
  deleteVisualization: (id) => dispatch(visualizationDelete({ id })),
  clearDeleteVisualizationState: () => dispatch(visualizationDeleteClear()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withAuth0(UserProfileView))
